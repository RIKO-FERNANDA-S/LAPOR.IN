// lib/prisma.ts
import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from '@prisma/adapter-neon'

const globalForPrisma = globalThis as unknown as { 
  prisma?: PrismaClient
}

// Gunakan Proxy untuk inisialisasi malas (lazy initialization).
// Ini mencegah error "No database host or connection string was set" 
// jika modul dievaluasi sebelum environment variables dimuat sepenuhnya oleh Next.js.
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop, receiver) {
    if (!globalForPrisma.prisma) {
      const connectionString = process.env.DATABASE_URL
      if (!connectionString) {
        throw new Error("DATABASE_URL is not set in environment variables")
      }
      
      const adapter = new PrismaNeon({ connectionString })
      globalForPrisma.prisma = new PrismaClient({ adapter })
    }
    
    const value = Reflect.get(globalForPrisma.prisma, prop, receiver)
    if (typeof value === 'function') {
      return value.bind(globalForPrisma.prisma)
    }
    return value
  }
})