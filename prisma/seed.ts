// Seeds the SQLite database with Al-Jawad Restaurant's initial menu.
// Run via `npx prisma db seed` (or automatically after `npx prisma migrate dev`).

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Start clean so this script is safely re-runnable
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();

  await prisma.category.create({
    data: {
      name: "المقبلات",
      order: 1,
      items: {
        create: [
          {
            name: "حمص بالطحينة",
            description:
              "حمص كريمي مع زيت الزيتون البكر وحبات الحمص الكاملة وصنوبر محمص.",
            price: 6.5,
            imageUrl:
              "https://images.unsplash.com/photo-1620645868213-e08e93df1f47?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "متبل باذنجان",
            description:
              "باذنجان مشوي على الفحم ممزوج بالطحينة والثوم والليمون الطازج.",
            price: 6.0,
            imageUrl:
              "https://images.unsplash.com/photo-1600335895229-6e75511892c8?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "ورق عنب",
            description:
              "ورق عنب محشو بالأرز والخضار وزيت الزيتون، يُقدّم دافئاً.",
            price: 7.5,
            imageUrl:
              "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?q=80&w=800&auto=format&fit=crop",
          },
        ],
      },
    },
  });

  await prisma.category.create({
    data: {
      name: "الأطباق الرئيسية",
      order: 2,
      items: {
        create: [
          {
            name: "مشاوي مشكلة",
            description:
              "تشكيلة من الشيش طاووق واللحم المشوي وكفتة الجواد، تُقدّم مع الأرز والخضار المشوية.",
            price: 18.0,
            imageUrl:
              "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "كبسة لحم",
            description:
              "أرز بسمتي معطّر بالبهارات العربية مع قطع لحم غنم طرية ومكسرات محمصة.",
            price: 16.0,
            imageUrl:
              "https://images.unsplash.com/photo-1633945274309-2c4b1f8dcb27?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "فروج مشوي كامل",
            description:
              "فروج طازج متبّل بأعشاب الجواد الخاصة ومشوي على الفحم حتى يصبح ذهبياً.",
            price: 14.5,
            imageUrl:
              "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=800&auto=format&fit=crop",
          },
        ],
      },
    },
  });

  await prisma.category.create({
    data: {
      name: "العصائر",
      order: 3,
      items: {
        create: [
          {
            name: "عصير مانجو طازج",
            description:
              "مانجو طبيعية مضروبة طازجة بدون أي إضافات، منعشة وغنية بالنكهة.",
            price: 5.0,
            imageUrl:
              "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "ليمون بالنعنع",
            description:
              "ليمون طازج مع أوراق النعنع، مثلّج ومنعش، مثالي مع الأطباق المشوية.",
            price: 4.5,
            imageUrl:
              "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "عصير رمان",
            description:
              "رمان طبيعي معصور طازجاً، غني باللون والمذاق الحامض الحلو.",
            price: 5.5,
            imageUrl:
              "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?q=80&w=800&auto=format&fit=crop",
          },
        ],
      },
    },
  });

  await prisma.category.create({
    data: {
      name: "الحلويات",
      order: 4,
      items: {
        create: [
          {
            name: "كنافة نابلسية",
            description:
              "كنافة ساخنة بالجبنة مغطاة بالقطر وجوز الهند، تُقدّم طازجة من الفرن.",
            price: 7.0,
            imageUrl:
              "https://images.unsplash.com/photo-1609525313344-8b7b8f1e2c0a?q=80&w=800&auto=format&fit=crop",
          },
          {
            name: "بقلاوة مشكلة",
            description:
              "تشكيلة من البقلاوة المحشوة بالفستق الحلبي واللوز، مغموسة بالقطر.",
            price: 6.5,
            imageUrl:
              "https://images.unsplash.com/photo-1519676867240-f03562e64548?q=80&w=800&auto=format&fit=crop",
          },
        ],
      },
    },
  });

  console.log("✅ Seed complete: 4 categories, 11 menu items.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
