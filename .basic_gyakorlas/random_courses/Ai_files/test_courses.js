// Test the POST /courses endpoint

const BASE_URL = "http://localhost:3000";

async function testEndpoint(description, data) {
  console.log(`\n--- ${description} ---`);
  try {
    const response = await fetch(`${BASE_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(`Status: ${response.status}`);
    console.log("Response:", result);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function runTests() {
  // Test 1: Missing data
  await testEndpoint("Test 1: Missing data (no subject)", {
    firstname: "Jack",
    lastname: "Wilson",
    class: "10B",
  });

  // Test 2: New student, existing subject
  await testEndpoint("Test 2: New student with existing subject", {
    firstname: "Jack",
    lastname: "Wilson",
    class: "10B",
    subject: "Mathematics",
  });

  // Test 3: Duplicate enrollment (should fail)
  await testEndpoint("Test 3: Duplicate enrollment", {
    firstname: "Jack",
    lastname: "Wilson",
    class: "10B",
    subject: "Mathematics",
  });

  // Test 4: New student, new subject
  await testEndpoint("Test 4: New student with new subject", {
    firstname: "Sarah",
    lastname: "Connor",
    class: "11A",
    subject: "Robotics",
  });

  // Test 5: Existing student, new subject
  await testEndpoint("Test 5: Existing student with new subject", {
    firstname: "Adam",
    lastname: "Smith",
    class: "10A",
    subject: "Music",
  });
}

runTests();
