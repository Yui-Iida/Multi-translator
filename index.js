const dotenv = require("dotenv");
dotenv.config();

// .envファイルからAPI_KEYを取得
const apiKey = process.env.API_KEY;

// ここから先はapiKeyを使った処理を記述
console.log(apiKey);
