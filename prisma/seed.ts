import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Seed TahunAjaran
    await prisma.tahunAjaran.createMany({
        data: [
            { tahun: "2021/2022" },
            { tahun: "2022/2023" },
            { tahun: "2023/2024" },
            { tahun: "2024/2025" },
        ]
    });
    const tahunAjaranIds = (await prisma.tahunAjaran.findMany()).map((ta) => ta.id);

    // Seed Jurusan
    const jurusan = [];
    for (let i = 0; i < 5; i++) {
        jurusan.push({
            nama: faker.commerce.department(),
            deskripsi: faker.lorem.sentence()
        });
    }
    await prisma.jurusan.createMany({ data: jurusan });
    const jurusanIds = (await prisma.jurusan.findMany()).map((j) => j.id);

    // Seed Kelas
    const kelas = [];
    for (let i = 0; i < 10; i++) {
        kelas.push({
            nama: `Kelas ${faker.number.int({ min: 1, max: 12 })}`,
            jurusanId: faker.helpers.arrayElement(jurusanIds),
            tahunAjaranId: faker.helpers.arrayElement(tahunAjaranIds)
        });
    }
    await prisma.kelas.createMany({ data: kelas });
    const kelasIds = (await prisma.kelas.findMany()).map((k) => k.id);

    // Seed Siswa
    const siswa = [];
    for (let i = 0; i < 50; i++) {
        siswa.push({
            nisn: faker.number.int({ min: 10000, max: 60000 }) + i,
            nama: faker.internet.userName(),
            nis: (faker.number.int({ min: 1000, max: 9999 }) + i).toString(),
            tanggalLahir: faker.date.birthdate(),
            alamat: faker.location.streetAddress(),
            jenisKelamin: faker.helpers.arrayElement(["Laki-laki", "Perempuan"]),
            kelasId: faker.helpers.arrayElement(kelasIds)
        });
    }
    await prisma.siswa.createMany({ data: siswa });
    const siswaIds = (await prisma.siswa.findMany()).map((s) => s.id);

    // Seed OrangTua
    const orangTua = [];
    for (let i = 0; i < 50; i++) {
        orangTua.push({
            nama: faker.internet.userName(),
            hubungan: faker.helpers.arrayElement(["Ayah", "Ibu"]),
            telepon: faker.phone.number(),
            tanggalLahir: faker.date.birthdate(),
            alamat: faker.location.streetAddress(),
            siswaId: faker.helpers.arrayElement(siswaIds)
        });
    }
    await prisma.orangTua.createMany({ data: orangTua });

    // Seed Guru
    const guru = [];
    for (let i = 0; i < 10; i++) {
        guru.push({
            nama: faker.internet.userName(),
            nip: faker.number.int({ min: 10000, max: 99999 }).toString(),
            alamat: faker.location.streetAddress()
        });
    }
    await prisma.guru.createMany({ data: guru });
    const guruIds = (await prisma.guru.findMany()).map((g) => g.id);

    // Seed MataPelajaran
    const mataPelajaran = [];
    for (let i = 0; i < 20; i++) {
        mataPelajaran.push({
            nama: faker.company.buzzNoun(),
            kode: faker.string.alphanumeric(6).toUpperCase(),
            guruId: faker.helpers.arrayElement(guruIds)
        });
    }
    await prisma.mataPelajaran.createMany({ data: mataPelajaran });

    // Seed Operator
    const operator = [];
    for (let i = 0; i < 5; i++) {
        operator.push({
            nama: faker.internet.userName(),
            username: faker.internet.userName(),
            password: faker.internet.password(),
            fotoProfile: "profile.jpg",
            role: null
        });
    }
    await prisma.operator.createMany({ data: operator });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
