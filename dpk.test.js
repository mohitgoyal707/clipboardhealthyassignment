const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto")

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the same string as input, if less than 256 characters", () => {
    const event = {
      partitionKey: "something"
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("something");
  });

  it("Returns the same string as input, if key has 256 characters", () => {
    const event = {
      partitionKey: "x".repeat(256)
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });


  it("Returns hash of empty object, with empty object input", () => {
    const event = {}
    const expectedOutput = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex")
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(expectedOutput);
  });

  it("Returns sha3-512 hash of partition key, for object input, if partition key length > 256", () => {
    const event = {
      partitionKey: "x".repeat(300)
    }
    const expectedOutput = crypto.createHash("sha3-512").update(event.partitionKey).digest("hex")
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(expectedOutput);
  });

});
