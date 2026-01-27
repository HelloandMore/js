// Test one simple case
const BASE_URL = "http://localhost:3000";

async function test() {
  console.log("Testing new student with new subject...");
  try {
    const response = await fetch(`${BASE_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: "TestUser",
        lastname: "TestLast",
        class: "12C",
        subject: "TestSubject",
      }),
    });
    const result = await response.json();
    console.log(`Status: ${response.status}`);
    console.log("Response:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
