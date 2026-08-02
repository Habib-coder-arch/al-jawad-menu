"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { uploadMenuImage } from "@/lib/supabase-admin";
import { LBP_RATE } from "@/lib/constants";

function refreshMenuPages() {
  revalidatePath("/admin");
  revalidatePath("/");
}

// ---------- Menu items ----------

export async function createItem(formData) {
  await requireAdmin();

  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const priceLbp = parseFloat(formData.get("price"));
  const categoryId = Number(formData.get("categoryId"));
  const isAvailable = formData.get("isAvailable") === "on";
  const imageFile = formData.get("image");

  if (!name || !description || !categoryId || Number.isNaN(priceLbp)) {
    redirect("/admin/items/new?error=1");
  }

  const price = Math.round((priceLbp / LBP_RATE) * 100) / 100;

  const hasImage = imageFile instanceof File && imageFile.size > 0;
  let imageUrl = null;
  if (hasImage) {
    try {
      imageUrl = await uploadMenuImage(imageFile);
    } catch (err) {
      console.error(err);
      redirect("/admin/items/new?error=upload");
    }
  }

  await prisma.menuItem.create({
    data: { name, description, price, imageUrl, categoryId, isAvailable },
  });

  refreshMenuPages();
  redirect("/admin");
}

export async function updateItem(formData) {
  await requireAdmin();

  const id = Number(formData.get("id"));
  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const priceLbp = parseFloat(formData.get("price"));
  const categoryId = Number(formData.get("categoryId"));
  const isAvailable = formData.get("isAvailable") === "on";
  const imageFile = formData.get("image");

  if (!id || !name || !description || !categoryId || Number.isNaN(priceLbp)) {
    redirect(`/admin/items/${id}/edit?error=1`);
  }

  const price = Math.round((priceLbp / LBP_RATE) * 100) / 100;

  const hasNewImage = imageFile instanceof File && imageFile.size > 0;
  let imageUrl;
  if (hasNewImage) {
    try {
      imageUrl = await uploadMenuImage(imageFile);
    } catch (err) {
      console.error(err);
      redirect(`/admin/items/${id}/edit?error=upload`);
    }
  }

  await prisma.menuItem.update({
    where: { id },
    data: {
      name,
      description,
      price,
      categoryId,
      isAvailable,
      ...(imageUrl ? { imageUrl } : {}),
    },
  });

  refreshMenuPages();
  redirect("/admin");
}

export async function deleteItem(formData) {
  await requireAdmin();

  const id = Number(formData.get("id"));
  if (!id) redirect("/admin");

  await prisma.menuItem.delete({ where: { id } });

  refreshMenuPages();
  redirect("/admin");
}

// ---------- Categories ----------

export async function createCategory(formData) {
  await requireAdmin();

  const name = formData.get("name")?.toString().trim();
  if (!name) redirect("/admin");

  const last = await prisma.category.findFirst({ orderBy: { order: "desc" } });
  const nextOrder = (last?.order ?? 0) + 1;

  await prisma.category.create({ data: { name, order: nextOrder } });

  refreshMenuPages();
  redirect("/admin");
}

export async function deleteCategory(formData) {
  await requireAdmin();

  const id = Number(formData.get("id"));
  if (!id) redirect("/admin");

  await prisma.category.delete({ where: { id } });

  refreshMenuPages();
  redirect("/admin");
}