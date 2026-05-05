// console.log("INIT FORM CONTACT");
// ─── Konstanta ──────────────────────────────────────────────
const FIELD_LABELS = {
  name: "Nama Lengkap",
  email: "Email",
  phone: "Nomor HP",
  company_name: "Nama Perusahaan",
  business_field: "Bidang Usaha",
  company_address: "Alamat Perusahaan",
  message: "Pesan / Keterangan",
};

// ─── Helpers ─────────────────────────────────────────────────
function showAlert(form, message, type) {
  const alert = form.querySelector("#form-alert");
  if (!alert) return;
  alert.textContent = message;
  alert.className = [
    "p-4 rounded-lg text-sm font-medium mb-6",
    type === "success"
      ? "bg-green-50 text-green-700 border border-green-200"
      : "bg-red-50 text-red-700 border border-red-200",
  ].join(" ");
  alert.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function hideAlert(form) {
  const alert = form.querySelector("#form-alert");
  if (alert) alert.className = "hidden";
}

function setLoading(form, loading) {
  const btn = form.querySelector("#submit-btn");
  const label = btn?.querySelector("[data-hover-effect]");
  if (btn) btn.disabled = loading;
  if (label) label.textContent = loading ? "Mengirim..." : "Kirim Pesan";
}

function validate(data) {
  // Cek field kosong
  for (const [key, value] of Object.entries(data)) {
    if (!value || value.length === 0) {
      return {
        ok: false,
        msg: `Kolom "${FIELD_LABELS[key] ?? key}" tidak boleh kosong!`,
      };
    }
  }

  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { ok: false, msg: "Format email tidak valid!" };
  }

  // Validasi nomor HP (8–15 digit, boleh diawali +)
  const phoneRegex = /^[+]?[0-9]{8,15}$/;
  if (!phoneRegex.test(data.phone.replace(/[\s\-]/g, ""))) {
    return { ok: false, msg: "Nomor HP tidak valid! (min 8 digit)" };
  }

  return { ok: true };
}

// ─── Handler submit (dipanggil via delegation) ────────────────
async function handleSubmit(e) {
  const form = e.target.closest("#contact-form");
  if (!form) return;

  e.preventDefault();
  hideAlert(form);

  // ✅ Baca lazy dari variabel yang sudah ada di BaseLayout
  const API_BASE_URL = window.__ENV_PUBLIC_API_URL__;
  if (!API_BASE_URL) {
    showAlert(
      form,
      "Konfigurasi tidak ditemukan. Coba refresh halaman.",
      "error",
    );
    return;
  }

  const getValue = (id) => form.querySelector(`#${id}`)?.value.trim() ?? "";

  const data = {
    name: getValue("name"),
    email: getValue("email"),
    phone: getValue("phone"),
    company_name: getValue("company_name"),
    business_field: getValue("business_field"),
    company_address: getValue("business_address"), // id di HTML = business_address
    message: getValue("message"),
  };

  const check = validate(data);
  if (!check.ok) {
    showAlert(form, check.msg, "error");
    return;
  }

  setLoading(form, true);

  try {
    // console.log("API_BASE_URL:", `${API_BASE_URL}/api/contacts/messages`);
    const res = await fetch(`${API_BASE_URL}/api/contacts/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    let result = {};
    try {
      result = await res.json();
    } catch (_) {}

    if (res.ok && result.success) {
      showAlert(
        form,
        "Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.",
        "success",
      );
      form.reset();
    } else if (res.status === 429) {
      showAlert(
        form,
        "Terlalu banyak permintaan. Coba lagi beberapa saat.",
        "error",
      );
    } else if (res.status >= 500) {
      showAlert(
        form,
        "Server sedang bermasalah. Coba beberapa saat lagi.",
        "error",
      );
    } else {
      showAlert(
        form,
        result.error || "Terjadi kesalahan. Silakan coba lagi.",
        "error",
      );
    }
  } catch (_) {
    showAlert(
      form,
      "Gagal mengirim pesan. Periksa koneksi internet Anda.",
      "error",
    );
  } finally {
    setLoading(form, false);
  }
}

// ─── Pasang listener SEKALI di document (event delegation) ───
// Ini menggantikan initContactForm() + DOMContentLoaded + barba:afterEnter.
// Tidak perlu dipasang ulang tiap navigasi Barba, tidak akan double-bind.
document.addEventListener("submit", handleSubmit);
