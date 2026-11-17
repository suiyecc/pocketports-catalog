import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const locales = ['en', 'zh-Hans', 'zh-Hant'];
const base = 'https://www.xsmth.com';
const routes = { en: '/en', 'zh-Hans': '', 'zh-Hant': '/zh-hant' };
const targetPlatforms = new Set(['Android', 'iOS', 'iPadOS', 'macOS', 'Windows']);
const originalPlatforms = new Set(['Windows', 'macOS', 'Classic Mac OS', 'DOS', 'Linux']);

function requireHttps(value, label) {
  assert.equal(typeof value, 'string', `${label}: expected an HTTPS URL`);
  const url = new URL(value);
  assert.equal(url.protocol, 'https:', `${label}: URL must use HTTPS`);
  assert.ok(!url.username && !url.password, `${label}: URL contains credentials`);
}

function requireTranslations(values, label) {
  assert.ok(values && typeof values === 'object', `${label}: missing translations`);
  assert.deepEqual(new Set(Object.keys(values)), new Set(locales), `${label}: unexpected set of languages`);
  for (const locale of locales) {
    assert.ok(typeof values[locale] === 'string' && values[locale].trim(), `${label}: missing ${locale} text`);
  }
}

function validateOriginalPlatforms(releases, gameId) {
  assert.ok(Array.isArray(releases), `${gameId}: expected a list of original releases`);
  const seen = new Set();
  for (const { platform, edition, source } of releases) {
    assert.ok(originalPlatforms.has(platform), `${gameId}: unknown original platform ${platform}`);
    requireHttps(source, `${gameId} ${platform}`);
    const key = JSON.stringify([platform, edition ?? '', source]);
    assert.ok(!seen.has(key), `${gameId}: repeated original platform evidence for ${platform}`);
    seen.add(key);
  }
}

function validateProject(project) {
  const repository = project.repository;
  assert.match(repository, /^[\w.-]+\/[\w.-]+$/);
  assert.equal(project.url, 'https://github.com/' + repository, `${repository}: incorrect GitHub URL`);
  assert.ok(project.original_platform && project.port_type, `${repository}: missing origin or port type`);
  assert.ok(Array.isArray(project.platforms) && project.platforms.length, `${repository}: missing target platforms`);

  const platforms = new Set(project.platforms);
  assert.equal(platforms.size, project.platforms.length, `${repository}: duplicated target platform`);
  assert.ok(project.platform_evidence, `${repository}: missing platform documentation`);
  assert.deepEqual(new Set(Object.keys(project.platform_evidence)), platforms,
    `${repository}: platform documentation must match the target platforms`);

  for (const platform of platforms) {
    assert.ok(targetPlatforms.has(platform), `${repository}: unknown target platform ${platform}`);
    requireHttps(project.platform_evidence[platform], `${repository} ${platform}`);
  }
  requireTranslations(project.data_requirements, `${repository} data requirements`);
  if ('desktop_data_requirements' in project) {
    requireTranslations(project.desktop_data_requirements, `${repository} desktop data requirements`);
  }
}

function validate(data) {
  assert.equal(data.schema_version, 1, 'Unsupported catalog schema');
  assert.match(data.reviewed, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(Array.isArray(data.games) && data.games.length, 'Expected a nonempty list of games');
  const gameIds = new Set();
  const repositories = new Set();

  for (const game of data.games) {
    assert.match(game.id, /^[a-z0-9-]+$/);
    assert.ok(!gameIds.has(game.id), `Duplicate game: ${game.id}`);
    gameIds.add(game.id);
    requireTranslations(game.names, `${game.id} names`);
    requireTranslations(game.pages, `${game.id} pages`);
    for (const locale of locales) {
      const expectedPage = `${base}${routes[locale]}/games/${game.id}/`;
      assert.equal(game.pages[locale], expectedPage, `${locale}/${game.id}: incorrect page URL`);
    }

    validateOriginalPlatforms(game.original_platforms, game.id);
    assert.ok(Array.isArray(game.projects) && game.projects.length, `${game.id}: missing projects`);
    for (const project of game.projects) {
      validateProject(project);
      const key = project.repository.toLowerCase();
      assert.ok(!repositories.has(key), `Repeated repository: ${project.repository}`);
      repositories.add(key);
    }
  }

  assert.equal(data.game_count, gameIds.size, 'Incorrect game count');
  assert.equal(data.repository_count, repositories.size, 'Incorrect repository count');
  return { games: gameIds.size, repositories: repositories.size };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const snapshot = new URL('../data/catalog.json', import.meta.url);
  const data = JSON.parse(await readFile(snapshot, 'utf8'));
  const { games, repositories } = validate(data);
  console.log(`Validated ${games} games and series, ${repositories} repositories.`);
}

export { base, locales, routes, validate };
