"use server";
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateSchema, UpdateSchema } from '@/schemas/task-group';
import type { State } from '@/schemas/task-group';
import { currentUser } from '@/hooks/use-current-user';


//! create task group
export async function create_task_group(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    criticality: formData.get('criticality'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Task Group.',
    };
  }

  // Prepare data for insertion into the database
  const { name, description, criticality } = validatedFields.data;
  // Insert data into the database
  try {
    const user = await currentUser();
    const user_id = user?.id;
    const selected_project_id = user?.selected_project_id;
    if (!user_id) {
      throw new Error('User not found');
    }
    if (!selected_project_id) {
      throw new Error('Project not found');
    }
    await db.taskGroup.create({
      data: {
        name,
        description,
        criticality,
        project_id: selected_project_id,
      },
    });
  }
  catch (error) {
    console.log("error", error)
    return {
      message: 'Failed to Create Task Group.',
    };
  }

  // Invalidate the cache for the task group list page
  revalidatePath('/dashboard/task-groups');

  // Redirect to the task group list page
  redirect('/dashboard/task-groups');
}

//! update task group
export async function update_task_group(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = UpdateSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    criticality: formData.get('criticality'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Task Group.',
    };
  }

  // Prepare data for insertion into the database
  const { name, description, criticality } = validatedFields.data;
  // Insert data into the database
  try {
    const user = await currentUser();
    const user_id = user?.id;
    const selected_project_id = user?.selected_project_id;
    if (!user_id) {
      throw new Error('User not found');
    }
    if (!selected_project_id) {
      throw new Error('Project not found');
    }
    await db.taskGroup.update({
      where: {
        id: prevState.id,
      },
      data: {
        name,
        description,
        criticality,
      },
    });
  }
  catch (error) {
    console.log("error", error)
    return {
      message: 'Failed to Update Task Group.',
    };
  }

  // Invalidate the cache for the task group list page
  revalidatePath('/dashboard/task-groups');

  // Redirect to the task group list page
  redirect('/dashboard/task-groups');
}


export async function delete_task_group(formData: FormData) {
  const inputId = formData.get("inputId") as string;
  try {
    // Check the existence of the task group before deletion
    const existingTaskGroup = await db.taskGroup.findUnique({
      where: {
        id: inputId,
      },
    });

    if (!existingTaskGroup) {
      throw new Error('Task group not found for deletion.');
    }

    // Delete tasks associated with the group
    await db.$transaction(async (tx) => {
      // Delete tasks associated with the group
      await tx.task.deleteMany({
        where: {
          task_group_id: inputId,
        },
      });

      // Delete the task group
      await tx.taskGroup.delete({
        where: {
          id: inputId,
        },
      });
      revalidatePath('/dashboard/task-groups');
    });

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete task group.');
  }
}