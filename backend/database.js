const supabaseUrl = "https://oeqrtynoarrzcnokmjek.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lcXJ0eW5vYXJyemNub2ttamVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MTE4ODksImV4cCI6MjA2NDA4Nzg4OX0.qXJ2mbIxv5_XUjNhL-Zm_77V8EOSKHY3py8WD5zD3UA";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

export async function fetchAdminCredentialsFromDB() {
  const { data, error } = await supabase.from("admin_credentials").select();

  if (error) {
    throw error;
  }

  const admins = data;

  return admins;
}

export async function fetchApplicationsDetailsFromDB() {
  const { data, error } = await supabase.from("students-applications").select();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateApplicationStatusInDB(updatedStatus, id) {
  const { error } = await supabase
    .from("students-applications")
    .update({ application_status: updatedStatus })
    .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function deleteAdminFromDB(id) {
  const response = await supabase
    .from("admin_credentials")
    .delete()
    .eq("id", id);
}

export async function addAdminToDB(
  full_name,
  email_address,
  password,
  designation
) {
  const { error } = await supabase
    .from("admin_credentials")
    .insert({ full_name, email_address, password, designation });

  if (error) {
    throw error;

    return null;
  }
}
