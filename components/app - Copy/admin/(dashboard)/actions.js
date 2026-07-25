"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

function refreshMenuPages() {
  revalidatePath("/admin");
  revalidatePath("/");
}

// ---------- Menu items ----------

export async function createItem(formData) {
  await requireAdmin();

  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const price = parseFloat(formData.get("price"));
  const imageUrl = formData.get("imageUrl")?.toString().trim();
  const categoryId = Number(formData.get("categoryId"));
  const isAvailable = formData.get("isAvailable") === "on";

  if (!name || !description || !imageUrl || !categoryId || Number.isNaN(price)) {
    redirect("/admin/items/new?error=1");
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
  const price = parseFloat(formData.get("price"));
  const imageUrl = formData.get("imageUrl")?.toString().trim();
  const categoryId = Number(formData.get("categoryId"));
  const isAvailable = formData.get("isAvailable") === "on";

  if (!id || !name || !description || !imageUrl || !categoryId || Number.isNaN(price)) {
    redirect(`/admin/items/${id}/edit?error=1`);
  }

  await prisma.menuItem.update({
    where: { id },
    data: { name, description, price, imageUrl, categoryId, isAvailable },
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

  // Schema has onDelete: Cascade on MenuItem.category, so this also removes
  // every item that belonged to this category. The confirm dialog on the
  // button warns about that before the form ever submits.
  await prisma.category.delete({ where: { id } });

  refreshMenuPages();
  redirect("/admin");
}
