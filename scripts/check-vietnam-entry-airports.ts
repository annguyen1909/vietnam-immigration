import assert from 'node:assert/strict';
import { VIETNAM_ENTRY_AIRPORTS, isVietnamEntryAirport } from '../src/data/vietnamEntryAirports';

assert.equal(VIETNAM_ENTRY_AIRPORTS.length, 14);
assert.equal(new Set(VIETNAM_ENTRY_AIRPORTS).size, VIETNAM_ENTRY_AIRPORTS.length);
assert.equal(isVietnamEntryAirport('Tan Son Nhat Airport Border Gate'), true);
assert.equal(isVietnamEntryAirport('Not a real airport'), false);

console.log('Vietnam entry airports self-check ok');
