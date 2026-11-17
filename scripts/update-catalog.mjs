import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mkdir, open, readFile, rename, rm } from 'node:fs/promises';
import http from 'node:http';
import { resolve } from 'node:path';
import { base, locales, routes, validate } from './validate.mjs';

const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== '--from' || !args[1])) {
  throw new Error('Usage: node scripts/update-catalog.mjs [--from <published-site-directory>]');
}
// Honor the caller's network proxy on Node versions with built-in proxy support.
if (!args.length) http.setGlobalProxyFromEnv?.();

async function loadCatalog(locale, directory) {
  const path = routes[locale] + '/catalog.json';
  if (directory) {
    return JSON.parse(await readFile(resolve(directory, '.' + path), 'utf8'));
  }

  const response = await fetch(base + path, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) {
    throw new Error(`${path} returned HTTP ${response.status}`);
  }
  return response.json();
}

function byLocale(valueFor) {
  return Object.fromEntries(locales.map(locale => [locale, valueFor(locale)]));
}

function indexBy(records, field, label) {
  assert.ok(Array.isArray(records), `${label}: expected an array`);
  const index = new Map();
  for (const record of records) {
    const key = record[field];
    assert.ok(typeof key === 'string' && key.length > 0, `${label}: missing ${field}`);
    assert.ok(!index.has(key), `${label}: duplicate ${field} ${key}`);
    index.set(key, record);
  }
  return index;
}

function originalReleases(game, locale) {
  // An empty list is meaningful. An absent field can indicate an older site version.
  assert.ok(Array.isArray(game.originalPlatforms), `${locale}/${game.id}: missing originalPlatforms`);
  return game.originalPlatforms.map(({ platform, source, edition }) => ({
    platform,
    source,
    ...(edition ? { edition } : {}),
  }));
}

const mobilePlatforms = new Set(['Android', 'iOS', 'iPadOS']);

function targetEvidence(project) {
  assert.ok(Array.isArray(project.systems), `${project.repo}: missing target systems`);
  return Object.fromEntries(project.systems.map(platform => {
    // Older mobile entries use one setup guide for all of their mobile targets.
    const evidence = project.platformEvidence?.[platform]
      ?? (mobilePlatforms.has(platform) ? project.evidence : undefined);
    assert.ok(evidence, `${project.repo}: missing documentation for ${platform}`);
    return [platform, evidence];
  }));
}

function exportProject(translations) {
  const project = translations.en;
  const evidence = targetEvidence(project);

  for (const locale of locales) {
    const translated = translations[locale];
    const label = `${locale}/${project.repo}`;
    assert.equal(translated.codeRepository, project.codeRepository, `${label}: repository URL differs`);
    assert.deepEqual([...translated.systems].sort(), [...project.systems].sort(), `${label}: target systems differ`);
    assert.deepEqual(targetEvidence(translated), evidence, `${label}: platform documentation differs`);
    assert.equal(Boolean(translated.desktopNotes), Boolean(project.desktopNotes), `${label}: desktop notes differ`);
  }

  return {
    repository: project.repo,
    url: project.codeRepository,
    original_platform: project.origin,
    port_type: project.method,
    platforms: project.systems,
    platform_evidence: evidence,
    data_requirements: byLocale(locale => translations[locale].assets),
    ...(project.desktopNotes && {
      desktop_data_requirements: byLocale(locale => translations[locale].desktopNotes.assets),
    }),
  };
}

function exportGame(translations) {
  const game = translations.en;
  const releases = originalReleases(game, 'en');
  const repositories = byLocale(locale => indexBy(translations[locale].projects, 'repo', `${locale}/${game.id}`));
  const expectedRepositories = new Set(repositories.en.keys());

  for (const locale of locales) {
    const label = `${locale}/${game.id}`;
    assert.deepEqual(new Set(repositories[locale].keys()), expectedRepositories, `${label}: repositories differ`);
    assert.deepEqual(new Set(originalReleases(translations[locale], locale)), new Set(releases),
      `${label}: original platform evidence differs`);
  }

  return {
    id: game.id,
    names: byLocale(locale => translations[locale].name),
    pages: byLocale(locale => translations[locale].url),
    original_platforms: releases,
    projects: game.projects.map(project =>
      exportProject(byLocale(locale => repositories[locale].get(project.repo)))
    ),
  };
}

const catalogs = Object.fromEntries(await Promise.all(
  locales.map(async locale => [locale, await loadCatalog(locale, args[1])])
));
const reference = catalogs.en;
const gamesByLocale = byLocale(locale => indexBy(catalogs[locale].games, 'id', locale));
const expectedGameIds = new Set(gamesByLocale.en.keys());

for (const locale of locales) {
  const catalog = catalogs[locale];
  assert.equal(catalog.language, locale, `${locale}: unexpected catalog language`);
  for (const field of ['reviewed', 'gameCount', 'repositoryCount']) {
    assert.equal(catalog[field], reference[field], `${locale}: inconsistent ${field}`);
  }
  assert.equal(catalog.games.length, catalog.gameCount, `${locale}: incorrect game count`);
  const projectCount = catalog.games.reduce((count, game) => count + game.projects.length, 0);
  assert.equal(projectCount, catalog.repositoryCount, `${locale}: incorrect repository count`);
  assert.deepEqual(new Set(gamesByLocale[locale].keys()), expectedGameIds, `${locale}: game IDs differ`);
}

// Export catalog facts and our own file requirements. Artwork and reviews have separate rights.
const snapshot = {
  schema_version: 1,
  reviewed: reference.reviewed,
  source: base + '/en/catalog.json',
  game_count: reference.gameCount,
  repository_count: reference.repositoryCount,
  games: reference.games.map(game => exportGame(byLocale(locale => gamesByLocale[locale].get(game.id)))),
};
validate(snapshot);

const directory = new URL('../data/', import.meta.url);
const output = new URL('catalog.json', directory);
await mkdir(directory, { recursive: true });
const temporary = new URL(`catalog.${randomUUID()}.tmp`, directory);
const file = await open(temporary, 'wx');
try {
  try {
    await file.writeFile(JSON.stringify(snapshot, null, 2) + '\n');
  } finally {
    await file.close();
  }
  await rename(temporary, output);
} finally {
  await rm(temporary, { force: true });
}

console.log(`Updated ${snapshot.game_count} games and series, ${snapshot.repository_count} repositories.`);
