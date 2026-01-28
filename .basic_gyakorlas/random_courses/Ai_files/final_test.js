// Final comprehensive test of the POST /courses endpoint

const BASE_URL = "http://localhost:3000";

async function testEndpoint(description, data, expectedStatus) {
  console.log(`\n${description}`);
  try {
    const response = await fetch(`${BASE_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    const status = response.status === expectedStatus ? "✓" : "✗";
    console.log(
      `${status} Status: ${response.status} (expected ${expectedStatus})`,
    );
    console.log(`  Response:`, result);
    return response.status === expectedStatus;
  } catch (error) {
    console.error("✗ Error:", error.message);
    return false;
  }
}

async function runTests() {
  console.log("=".repeat(60));
  console.log("TESTING POST /courses ENDPOINT");
  console.log("=".repeat(60));

  const results = [];

  // Test 1: Missing data - no subject
  results.push(
    await testEndpoint(
      "1. Missing data (no subject) → 400",
      { firstname: "John", lastname: "Doe", class: "10A" },
      400,
    ),
  );

  // Test 2: Missing data - no firstname
  results.push(
    await testEndpoint(
      "2. Missing data (no firstname) → 400",
      { lastname: "Doe", class: "10A", subject: "Math" },
      400,
    ),
  );

  // Test 3: New student + new subject → Success
  const uniqueId = Date.now();
  results.push(
    await testEndpoint(
      "3. New student + new subject → 201",
      {
        firstname: `Student${uniqueId}`,
        lastname: "Test",
        class: "13Z",
        subject: `Subject${uniqueId}`,
      },
      201,
    ),
  );

  // Test 4: Duplicate enrollment → 400
  results.push(
    await testEndpoint(
      "4. Duplicate enrollment (same student + subject) → 400",
      {
        firstname: `Student${uniqueId}`,
        lastname: "Test",
        class: "13Z",
        subject: `Subject${uniqueId}`,
      },
      400,
    ),
  );

  // Test 5: Existing student + existing subject (different combination)
  results.push(
    await testEndpoint(
      "5. Existing student Adam Smith + existing subject History → 201",
      {
        firstname: "Adam",
        lastname: "Smith",
        class: "10A",
        subject: "History",
      },
      201,
    ),
  );

  // Summary
  console.log("\n" + "=".repeat(60));
  const passed = results.filter((r) => r).length;
  const total = results.length;
  console.log(`RESULTS: ${passed}/${total} tests passed`);
  console.log("=".repeat(60));
}

runTests();
