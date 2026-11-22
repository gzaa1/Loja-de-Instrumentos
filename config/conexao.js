import dns from 'dns';

dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
]);

import mongoose from "mongoose";


const url = "mongodb+srv://gizariell_db_user:teste123@cluster0.df9nqt9.mongodb.net/";

try {
    await mongoose.connect(url);
    console.log("✅ MongoDB conectado com sucesso!");
} catch (erro) {
    console.error("❌ Erro ao conectar no MongoDB:", erro.message);
    process.exit(1);
}

export default mongoose;