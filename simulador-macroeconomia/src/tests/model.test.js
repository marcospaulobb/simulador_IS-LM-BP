/**
 * Basic tests for the economic model
 * Run with: node src/tests/model.test.js
 */

import { computeEquilibrium, getFiscalMultiplier, getMonetaryMultiplier } from '../model.js';

// Test utilities
let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✓ ${message}`);
    testsPassed++;
  } else {
    console.error(`✗ ${message}`);
    testsFailed++;
  }
}

function assertThrows(fn, message) {
  try {
    fn();
    console.error(`✗ ${message} - Expected error but none was thrown`);
    testsFailed++;
  } catch (e) {
    console.log(`✓ ${message}`);
    testsPassed++;
  }
}

// Default parameters
const defaultParams = {
  G: 1000,
  T: 800,
  M: 1200,
  e: 1.0,
  rstar: 5.0,
  c: 0.6,
  b: 50,
  k: 0.5,
  h: 60,
  C0: 200,
  I0: 400,
  X0: 200,
  m: 0.1,
  v: 150
};

console.log('\n=== Testing Economic Model ===\n');

// Test 1: Closed Economy Equilibrium
console.log('Test Group: Closed Economy');
const closedEq = computeEquilibrium(defaultParams, false, true);
assert(closedEq.Y > 0, 'Closed economy Y should be positive');
assert(closedEq.r > 0, 'Closed economy r should be positive');
assert(isFinite(closedEq.Y), 'Closed economy Y should be finite');
assert(isFinite(closedEq.r), 'Closed economy r should be finite');

// Test 2: Open Economy - Floating Rate
console.log('\nTest Group: Open Economy - Floating Rate');
const openFloatEq = computeEquilibrium(defaultParams, true, true);
assert(openFloatEq.Y > 0, 'Open floating Y should be positive');
assert(openFloatEq.r === defaultParams.rstar, 'Open floating r should equal r*');
assert(openFloatEq.e_eq > 0, 'Exchange rate should be positive');
assert(isFinite(openFloatEq.e_eq), 'Exchange rate should be finite');

// Test 3: Open Economy - Fixed Rate
console.log('\nTest Group: Open Economy - Fixed Rate');
const openFixedEq = computeEquilibrium(defaultParams, true, false);
assert(openFixedEq.Y > 0, 'Open fixed Y should be positive');
assert(openFixedEq.r === defaultParams.rstar, 'Open fixed r should equal r*');
assert(openFixedEq.e_eq === defaultParams.e, 'Exchange rate should be fixed');
assert(openFixedEq.M_eq > 0, 'Endogenous M should be positive');

// Test 4: Fiscal Policy Effect (Closed Economy)
console.log('\nTest Group: Fiscal Policy Effects');
const higherG = { ...defaultParams, G: 1200 };
const higherGEq = computeEquilibrium(higherG, false, true);
assert(higherGEq.Y > closedEq.Y, 'Higher G should increase Y in closed economy');
assert(higherGEq.r > closedEq.r, 'Higher G should increase r (crowding out)');

// Test 5: Monetary Policy Effect (Closed Economy)
console.log('\nTest Group: Monetary Policy Effects');
const higherM = { ...defaultParams, M: 1400 };
const higherMEq = computeEquilibrium(higherM, false, true);
assert(higherMEq.Y > closedEq.Y, 'Higher M should increase Y in closed economy');
assert(higherMEq.r < closedEq.r, 'Higher M should decrease r');

// Test 6: Fiscal Policy in Open Floating (Should be ineffective)
console.log('\nTest Group: Mundell-Fleming Predictions');
const higherGOpenFloat = { ...defaultParams, G: 1200 };
const higherGOpenFloatEq = computeEquilibrium(higherGOpenFloat, true, true);
// In perfect capital mobility with floating rate, fiscal policy is neutralized
// Y is determined by LM at r*, so should be same as before
const tolerance = 0.01;
assert(
  Math.abs(higherGOpenFloatEq.Y - openFloatEq.Y) < tolerance,
  'Fiscal policy should be ineffective in open floating economy'
);

// Test 7: Monetary Policy in Open Floating (Should be effective)
const higherMOpenFloat = { ...defaultParams, M: 1400 };
const higherMOpenFloatEq = computeEquilibrium(higherMOpenFloat, true, true);
assert(
  higherMOpenFloatEq.Y > openFloatEq.Y,
  'Monetary policy should be effective in open floating economy'
);

// Test 8: Parameter Validation
console.log('\nTest Group: Parameter Validation');
assertThrows(
  () => computeEquilibrium({ ...defaultParams, c: 1.5 }, false, true),
  'Should reject c > 1'
);
assertThrows(
  () => computeEquilibrium({ ...defaultParams, k: 0 }, false, true),
  'Should reject k = 0'
);
assertThrows(
  () => computeEquilibrium({ ...defaultParams, h: 0 }, false, true),
  'Should reject h = 0'
);

// Test 9: Multipliers
console.log('\nTest Group: Multipliers');
const fiscalMult = getFiscalMultiplier(defaultParams, false);
const monetaryMult = getMonetaryMultiplier(defaultParams);
assert(fiscalMult > 0, 'Fiscal multiplier should be positive');
assert(monetaryMult > 0, 'Monetary multiplier should be positive');
assert(isFinite(fiscalMult), 'Fiscal multiplier should be finite');
assert(isFinite(monetaryMult), 'Monetary multiplier should be finite');

// Test 10: Extreme Values
console.log('\nTest Group: Extreme Values');
const lowB = { ...defaultParams, b: 10 }; // Very inelastic investment
const lowBEq = computeEquilibrium(lowB, false, true);
assert(isFinite(lowBEq.Y) && lowBEq.Y > 0, 'Should handle low b (steep IS)');

const highH = { ...defaultParams, h: 150 }; // Liquidity trap
const highHEq = computeEquilibrium(highH, false, true);
assert(isFinite(highHEq.Y) && highHEq.Y > 0, 'Should handle high h (flat LM)');

// Summary
console.log('\n=== Test Summary ===');
console.log(`Passed: ${testsPassed}`);
console.log(`Failed: ${testsFailed}`);
console.log(`Total: ${testsPassed + testsFailed}`);

if (testsFailed === 0) {
  console.log('\n✓ All tests passed!');
  process.exit(0);
} else {
  console.log(`\n✗ ${testsFailed} test(s) failed`);
  process.exit(1);
}
