if (typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile();
  } catch {
    // .env opcional
  }
}

import bcrypt from "bcryptjs";
import {
  db,
  adminUsersTable,
  siteSettingsTable,
  faqItemsTable,
  coursesTable,
  timelineEventsTable,
} from "@workspace/db";
import { eq } from "drizzle-orm";

async function runSeed() {
  console.log("Iniciando seed do banco de dados...");

  if (!process.env.DATABASE_URL) {
    console.error("ERRO: DATABASE_URL não definida no ambiente.");
    process.exit(1);
  }

  try {
    // 1. Usuário Administrador Padrão
    const adminEmail = (process.env.DEFAULT_ADMIN_EMAIL || "admin@cruzeirodosul.org.br").toLowerCase().trim();
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || "admin123";

    const [existingAdmin] = await db
      .select()
      .from(adminUsersTable)
      .where(eq(adminUsersTable.email, adminEmail))
      .limit(1);

    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      await db.insert(adminUsersTable).values({
        email: adminEmail,
        passwordHash,
        name: "Administrador Geral",
      });
      console.log(`✓ Administrador criado com sucesso (${adminEmail})`);
    } else {
      console.log(`- Administrador já existe (${adminEmail})`);
    }

    // 2. Configurações Institucionais Padrão
    const defaultSettings: Record<string, string> = {
      site_name: "Fraternidade Cruzeiro do Sul",
      site_description: "Centro espiritualista de Apometria e acolhimento fraterno em Guarulhos/SP.",
      address: "Guarulhos, São Paulo - SP",
      phone: "(11) 99999-9999",
      whatsapp: "5511999999999",
      email: "contato@cruzeirodosul.org.br",
      instagram: "https://instagram.com/fraternidadecruzeirodosul",
      facebook: "https://facebook.com/fraternidadecruzeirodosul",
      attendance_form_url: "https://forms.google.com",
      google_maps_embed: "",
    };

    for (const [key, value] of Object.entries(defaultSettings)) {
      await db
        .insert(siteSettingsTable)
        .values({ key, value })
        .onConflictDoUpdate({ target: siteSettingsTable.key, set: { value } });
    }
    console.log("✓ Configurações institucionais inseridas/atualizadas.");

    // 3. FAQs Institucionais Iniciais
    const existingFaqs = await db.select().from(faqItemsTable).limit(1);
    if (existingFaqs.length === 0) {
      await db.insert(faqItemsTable).values([
        {
          question: "O que é a Apometria?",
          answer:
            "A Apometria é uma técnica terapêutica espiritual que atua no desdobramento dos corpos sutis e na harmonização do campo energético através de comandos mentais e contagem de pulsos de energia cósmica.",
          category: "Geral",
          sortOrder: 1,
        },
        {
          question: "Os atendimentos espirituais têm algum custo?",
          answer:
            "Não. Todos os atendimentos fraternos e espirituais da Fraternidade Cruzeiro do Sul são 100% gratuitos, fundamentados na caridade e no amor ao próximo.",
          category: "Atendimento",
          sortOrder: 2,
        },
        {
          question: "Como solicitar atendimento fraterno?",
          answer:
            "Basta acessar a seção 'Solicitar Atendimento' em nosso site e preencher o formulário oficial. Nossa equipe de acolhimento entrará em contato com as orientações necessárias.",
          category: "Atendimento",
          sortOrder: 3,
        },
      ]);
      console.log("✓ Perguntas frequentes (FAQ) iniciais cadastradas.");
    }

    // 4. Linha do Tempo Histórica
    const existingTimeline = await db.select().from(timelineEventsTable).limit(1);
    if (existingTimeline.length === 0) {
      await db.insert(timelineEventsTable).values([
        {
          year: "Fundação",
          title: "Início dos Trabalhos Fraternos",
          text: "Início das atividades de caridade e estudos espirituais dedicados ao acolhimento e amor fraterno.",
          sortOrder: 1,
        },
        {
          year: "Consolidação",
          title: "Aprofundamento na Apometria",
          text: "Estruturação dos grupos de estudo e das mesas de atendimento com foco na ética e seriedade.",
          sortOrder: 2,
        },
      ]);
      console.log("✓ Linha do tempo histórica cadastrada.");
    }

    console.log("\nSeed concluído com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("Erro durante o seed:", error);
    process.exit(1);
  }
}

runSeed();
