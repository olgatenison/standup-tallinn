const fetch = require("node-fetch"); // або import, якщо модулі

exports.handler = async function (event, context) {
  const scriptUrl = "https://script.google.com/macros/s/ТУТ_ID/exec";

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const payload = JSON.parse(event.body);

    const response = await fetch(scriptUrl, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "Server Error", error: error.message }),
    };
  }
};
