const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const MAX_CANDIDATE_LENGTH = 256;
  
  // default initial value
  let candidate = "0";
  let hashCandidate = false;

  // partition key fron event
  if (event && event.partitionKey) {
    candidate = event.partitionKey
  } else if (event) {
    candidate = JSON.stringify(event);
    hashCandidate = true
  }

  if (candidate.length > MAX_CANDIDATE_LENGTH || hashCandidate) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate
};

// exports.deterministicPartitionKey = (event) => {
//   const TRIVIAL_PARTITION_KEY = "0";
//   const MAX_PARTITION_KEY_LENGTH = 256;
//   let candidate;

//   if (event) {
//     if (event.partitionKey) {
//       candidate = event.partitionKey;
//     } else {
//       const data = JSON.stringify(event);
//       candidate = crypto.createHash("sha3-512").update(data).digest("hex");
//     }
//   }

//   if (candidate) {
//     if (typeof candidate !== "string") {
//       candidate = JSON.stringify(candidate);
//     }
//   } else {
//     candidate = TRIVIAL_PARTITION_KEY;
//   }
//   if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
//     candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
//   }
//   return candidate;
// };