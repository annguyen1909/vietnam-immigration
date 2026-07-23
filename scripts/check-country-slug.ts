import assert from 'node:assert/strict';
import { countryNameToSlug, resolveCountrySlug } from '../src/lib/countrySlug';

assert.equal(countryNameToSlug("Côte d'Ivoire"), 'cote-d-ivoire');
assert.equal(countryNameToSlug('Curaçao'), 'curacao');
assert.equal(countryNameToSlug('Réunion'), 'reunion');
assert.equal(countryNameToSlug('São Tomé and Príncipe'), 'sao-tome-and-principe');
assert.equal(countryNameToSlug('Saint Barthélemy'), 'saint-barthelemy');
assert.equal(countryNameToSlug('Åland Islands'), 'aland-islands');
assert.equal(resolveCountrySlug('east-timor'), 'timor-leste');
assert.equal(resolveCountrySlug('macao'), 'macau');
assert.equal(resolveCountrySlug('ivory-coast'), 'cote-d-ivoire');

console.log('countrySlug self-check ok');
