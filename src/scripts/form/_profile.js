import { initializeModals, showModal } from "@js/_modal";

const API_URL = import.meta.env.PUBLIC_API_URL;
const BASE_URL = `${API_URL}/api/wai`;

const getToken = () => localStorage.getItem("auth_token");

initializeModals();

const getCurrentUser = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const p = token.split(".")[1];
    return JSON.parse(atob(p.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
};

const populateSelect = async (url, select, placeholder, selectedValue) => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    const tsInstance = select.tomselect;

    if (tsInstance) {
      tsInstance.clearOptions();
      tsInstance.addOption({ value: "", text: placeholder });
      data.forEach((item) => {
        tsInstance.addOption({ value: String(item.id), text: item.name });
      });
      tsInstance.refreshOptions(false);

      if (selectedValue) {
        const matched = data.find(
          (item) =>
            String(item.id) === String(selectedValue) ||
            item.name === selectedValue,
        );
        if (matched) {
          tsInstance.setValue(String(matched.id), true);
        }
      }

      select.disabled = false;
      tsInstance.enable();
    } else {
      select.innerHTML = `<option value="" disabled>${placeholder}</option>`;
      let selectedIndex = 0;
      data.forEach((item, i) => {
        const opt = document.createElement("option");
        opt.value = item.id;
        opt.textContent = item.name;
        select.appendChild(opt);
        if (
          selectedValue &&
          (String(item.id) === String(selectedValue) ||
            item.name === selectedValue)
        ) {
          selectedIndex = i + 1;
        }
      });
      select.selectedIndex = selectedIndex;
      select.disabled = false;
    }
  } catch (err) {
    console.error(`Gagal load ${url}:`, err);
  }
};

export const initProfilePage = async () => {
  const container = document.querySelector('[data-barba-namespace="profile"]');
  const containerDoc = document.querySelector('[data-barba-namespace="profile-document"]');

  // ── Jalankan inisialisasi dokumen jika di halaman dokumen ─────────────────
  if (containerDoc) {
    initDocumentPage(containerDoc);
    return;
  }

  if (!container) return;

  const token = getToken();
  if (!token) {
    window.location.href = "/";
    return;
  }

  const currentUser = getCurrentUser();
  if (!currentUser) {
    window.location.href = "/";
    return;
  }

  const $ = (id) => container.querySelector(`#${id}`);

  // ── Preview foto ──────────────────────────────────────────────────────────
  const inputPhoto = $("input-photo-profile");
  inputPhoto?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewPhoto = $("preview-photo");
    if (previewPhoto) {
      previewPhoto.src = URL.createObjectURL(file);
      previewPhoto.classList.remove("hidden");
    }
  });

  // ── Select elements ───────────────────────────────────────────────────────
  const selProvince = $("select-province");
  const selCityreg = $("select-cityreg");
  const selSubdistrict = $("select-subdistrict");
  const selWard = $("select-ward");

  if (selProvince && selCityreg && selSubdistrict && selWard) {
    const selectedProvince = selProvince.dataset.selectedProvince ?? "";
    const selectedRegency = selProvince.dataset.selectedRegency ?? "";
    const selectedDistrict = selProvince.dataset.selectedDistrict ?? "";
    const selectedVillage = selProvince.dataset.selectedVillage ?? "";

    if (selectedRegency) {
      if (selectedProvince) {
        const provOption = Array.from(selProvince.options).find(
          (opt) =>
            opt.text === selectedProvince || opt.value === selectedProvince,
        );
        if (provOption) provOption.selected = true;
      }

      const provinceId = selProvince.value;
      if (provinceId) {
        await populateSelect(
          `${BASE_URL}/regencies/${provinceId}`,
          selCityreg,
          "Pilih kota/kabupaten *",
          selectedRegency,
        );
        if (selCityreg.value) {
          await populateSelect(
            `${BASE_URL}/districts/${selCityreg.value}`,
            selSubdistrict,
            "Pilih kecamatan *",
            selectedDistrict,
          );
          if (selSubdistrict.value) {
            await populateSelect(
              `${BASE_URL}/villages/${selSubdistrict.value}`,
              selWard,
              "Pilih kelurahan *",
              selectedVillage,
            );
          }
        }
      }
    }

    selProvince.addEventListener("change", async () => {
      [selCityreg, selSubdistrict, selWard].forEach((sel) => {
        if (sel.tomselect) {
          sel.tomselect.clear(true);
          sel.tomselect.clearOptions();
          sel.tomselect.disable();
        } else {
          sel.innerHTML = `<option value="" disabled selected>Pilih...</option>`;
          sel.disabled = true;
        }
      });

      if (selProvince.value) {
        await populateSelect(
          `${BASE_URL}/regencies/${selProvince.value}`,
          selCityreg,
          "Pilih kota/kabupaten *",
        );
      }
    });

    selCityreg.addEventListener("change", async () => {
      [selSubdistrict, selWard].forEach((sel) => {
        if (sel.tomselect) {
          sel.tomselect.clear(true);
          sel.tomselect.clearOptions();
          sel.tomselect.disable();
        } else {
          sel.innerHTML = `<option value="" disabled selected>Pilih...</option>`;
          sel.disabled = true;
        }
      });

      if (selCityreg.value) {
        await populateSelect(
          `${BASE_URL}/districts/${selCityreg.value}`,
          selSubdistrict,
          "Pilih kecamatan *",
        );
      }
    });

    selSubdistrict.addEventListener("change", async () => {
      if (selWard.tomselect) {
        selWard.tomselect.clear(true);
        selWard.tomselect.clearOptions();
        selWard.tomselect.disable();
      } else {
        selWard.innerHTML = `<option value="" disabled selected>Pilih kelurahan *</option>`;
        selWard.disabled = true;
      }

      if (selSubdistrict.value) {
        await populateSelect(
          `${BASE_URL}/villages/${selSubdistrict.value}`,
          selWard,
          "Pilih kelurahan *",
        );
      }
    });

    const restoreTomSelect = (id, value) => {
      const el = $(id);
      if (!el || !value) return;
      if (el.tomselect) {
        el.tomselect.setValue(value, true);
      } else {
        el.value = value;
      }
    };

    const selGender = $("select-gender");
    restoreTomSelect("select-gender", selGender?.dataset.selectedGender ?? "");

    const selEducation = $("select-last-education");
    restoreTomSelect(
      "select-last-education",
      selEducation?.dataset.selectedEducation ?? "",
    );
  }

  // ── Helpers form ──────────────────────────────────────────────────────────
  const getVal = (id) => $(`${id}`)?.value?.trim() ?? "";
  const getSelText = (id) => {
    const s = $(id);
    return s?.options[s.selectedIndex]?.text ?? "";
  };

  // ── Simpan Informasi Pribadi ──────────────────────────────────────────────
  container
    .querySelector("[data-save-informasi]")
    ?.addEventListener("click", async () => {
      const photoFile = $("input-photo-profile")?.files?.[0] ?? null;
      let avatarFilename = $("preview-photo")?.dataset.original ?? "";

      if (photoFile) {
        const fd = new FormData();
        fd.append("file", photoFile);
        try {
          const r = await fetch(`${API_URL}/api/upload?folder=avatar`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: fd,
          });
          const j = await r.json();
          if (r.ok) {
            avatarFilename = j.filename;

            localStorage.setItem("avatar_cache", avatarFilename);
            document.cookie = `avatar_cache=${avatarFilename}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;

            window.dispatchEvent(
              new CustomEvent("avatar:updated", {
                detail: { avatar: avatarFilename },
              }),
            );

            const API_URL_LOCAL = import.meta.env.PUBLIC_API_URL;
            const newAvatarSrc = `${API_URL_LOCAL}/pubs/uploads/avatar/${avatarFilename}`;
            const previewPhoto = document.getElementById("preview-photo");
            if (previewPhoto) {
              previewPhoto.src = newAvatarSrc;
              previewPhoto.dataset.original = avatarFilename;
            }
          }
        } catch (err) {
          console.error("Gagal upload foto:", err);
        }
      }

      try {
        const res = await fetch(`${API_URL}/api/applicants/${currentUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            avatar: avatarFilename,
            name: getVal("input-name"),
            ktp_number: getVal("input-nik"),
            place_of_birth: getVal("input-place-of-birth"),
            date_of_birth: getVal("input-birthdate"),
            gender: getVal("select-gender"),
            email: getVal("input-email"),
            phone_number: getVal("input-nohp"),
            province: getSelText("select-province"),
            regency: getSelText("select-cityreg"),
            district: getSelText("select-subdistrict"),
            village: getSelText("select-ward"),
            poscode: getVal("input-postalcode"),
            address: getVal("input-address"),
          }),
        });
        if (!res.ok) throw new Error("Gagal menyimpan");
        setTimeout(() => {
          const modalSuccess = document.getElementById("modal-save-success");
          if (modalSuccess) showModal(modalSuccess);
        }, 1000);
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat menyimpan.");
      }
    });

  // ── Simpan Pendidikan ─────────────────────────────────────────────────────
  container
    .querySelector("[data-save-pendidikan]")
    ?.addEventListener("click", async () => {
      const formalId =
        container.querySelector("[data-formal-id]")?.dataset.formalId;
      const nonformalId = container.querySelector("[data-nonformal-id]")
        ?.dataset.nonformalId;

      try {
        if (formalId) {
          await fetch(`${API_URL}/api/education/formal/${formalId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              last_education: getVal("select-last-education"),
              school_name: getVal("input-sekolah"),
              start_date: getVal("formal-from-date"),
              finish_date: getVal("formal-to-date"),
              study_name: getVal("input-jurusan"),
            }),
          });
        }

        const nfSchool = getVal("input-lembaga-pendidikan");
        const nfStudy = getVal("input-bidang-pelajaran");
        if (nfSchool && nfStudy) {
          const nfBody = {
            school_name: nfSchool,
            study_name: nfStudy,
            start_date: getVal("nonformal-from-date"),
            finish_date: getVal("nonformal-to-date"),
          };
          const endpoint = nonformalId
            ? `${API_URL}/api/education/nonformal/${nonformalId}`
            : `${API_URL}/api/education/nonformal`;
          await fetch(endpoint, {
            method: nonformalId ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(
              nonformalId
                ? nfBody
                : { ...nfBody, applicant_refid: currentUser.refid },
            ),
          });
        }
        showModal("modal-save-success");
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat menyimpan.");
      }
    });
};

// ─────────────────────────────────────────────────────────────────────────────
// ── DOCUMENT PAGE ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

const MAX_DOCS = 5;
const MIN_DOCS = 1;

/**
 * Buat HTML string untuk satu item dokumen baru (tanpa data)
 */
const createDocumentItemHTML = (index) => `
  <div
    class="relative grid gap-6"
    data-document-item
    data-doc-id=""
  >
    <div class="flex items-center gap-4">
      <h5 class="text-xl text-balance tracking-normal">
        Dokumen ${String(index).padStart(2, "0")}.
      </h5>
      <div class="grow h-px bg-dark-300"></div>
      <button
        type="button"
        class="btn btn-icon btn-xs btn-danger"
        data-doc-remove
        title="Hapus dokumen"
      >
        <svg class="icon icon-stroke" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="col-span-full lg:col-span-1">
        <div class="c-form-wrapper">
          <div class="c-form c-form-default">
            <label class="c-label">Nama Dokumen</label>
            <input
              type="text"
              class="c-input"
              placeholder="Contoh: KTP, Ijazah, CV *"
              data-doc-field="document_name"
              value=""
            />
          </div>
        </div>
      </div>
      <div class="col-span-full lg:col-span-1">
        <div class="c-form-wrapper">
          <div class="c-form c-form-default">
            <label class="c-label">File Dokumen (PDF)</label>
            <div
              class="relative flex items-center gap-3 c-input cursor-pointer"
              data-doc-upload-area
            >
              <svg class="icon icon-stroke size-5 text-dark-400 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16V8M12 8L9 11M12 8L15 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="text-sm text-dark-400 truncate flex-1" data-doc-filename>
                Pilih file PDF…
              </span>
              <input
                type="file"
                accept="application/pdf"
                class="absolute inset-0 opacity-0 cursor-pointer"
                data-doc-file-input
              />
            </div>
            <p class="text-xs text-dark-400 mt-2">Maksimum 10MB. Format: .PDF</p>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

/**
 * Update nomor urut dan state tombol remove pada semua item
 */
const refreshDocumentItems = (docContainer) => {
  const items = docContainer.querySelectorAll("[data-document-item]");
  const count = items.length;

  items.forEach((item, i) => {
    // Update nomor label
    const label = item.querySelector("h5");
    if (label) {
      label.textContent = `Dokumen ${String(i + 1).padStart(2, "0")}.`;
    }

    // Disable tombol remove jika hanya 1 item
    const removeBtn = item.querySelector("[data-doc-remove]");
    if (removeBtn) {
      if (count <= MIN_DOCS) {
        removeBtn.classList.add("opacity-50", "pointer-events-none");
      } else {
        removeBtn.classList.remove("opacity-50", "pointer-events-none");
      }
    }
  });

  // Update label counter & disable tombol add jika sudah maks
  const countLabel = document.getElementById("doc-count-label");
  if (countLabel) countLabel.textContent = `(${count}/5)`;

  const addBtn = document.getElementById("btn-add-document");
  if (addBtn) {
    if (count >= MAX_DOCS) {
      addBtn.setAttribute("disabled", "true");
    } else {
      addBtn.removeAttribute("disabled");
    }
  }
};

/**
 * Pasang event listener file input pada satu item dokumen
 */
const bindDocumentItemEvents = (item) => {
  const fileInput = item.querySelector("[data-doc-file-input]");
  const fileNameEl = item.querySelector("[data-doc-filename]");

  fileInput?.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    if (file) {
      // Validasi ukuran file (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("Ukuran file terlalu besar. Maksimum 10MB.");
        fileInput.value = "";
        return;
      }
      if (fileNameEl) {
        fileNameEl.textContent = file.name;
        fileNameEl.classList.remove("text-dark-400");
      }
    }
  });
};

/**
 * Inject atau update tombol view pada header item dokumen
 */
const injectViewButton = (item, filename) => {
  const fileUrl = `${API_URL}/pubs/uploads/documents/${filename}`;
  let btn = item.querySelector("[data-doc-preview]");

  if (btn) {
    // Update URL jika tombol sudah ada (file diganti)
    btn.dataset.docUrl = fileUrl;
  } else {
    // Buat tombol baru dan sisipkan sebelum tombol hapus
    const removeBtn = item.querySelector("[data-doc-remove]");
    if (!removeBtn) return;

    btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-icon btn-xs btn-dark";
    btn.dataset.docPreview = "";
    btn.dataset.docUrl = fileUrl;
    btn.title = "Lihat dokumen";
    btn.innerHTML = `
      <svg class="icon icon-stroke" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" stroke-width="1.5"/>
        <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `;
    removeBtn.insertAdjacentElement("beforebegin", btn);
  }
};

const initDocumentPage = (container) => {
  const token = getToken();
  if (!token) {
    window.location.href = "/";
    return;
  }

  const currentUser = getCurrentUser();
  if (!currentUser) {
    window.location.href = "/";
    return;
  }

  const docContainer = container.querySelector("[data-document-container]");
  if (!docContainer) return;

  // ── Bind events pada item yang sudah ada (dari SSR) ───────────────────────
  docContainer.querySelectorAll("[data-document-item]").forEach((item) => {
    bindDocumentItemEvents(item);
  });

  // Inisialisasi state awal (counter, tombol remove)
  refreshDocumentItems(docContainer);

  // ── Tambah item dokumen baru ──────────────────────────────────────────────
  container.querySelector("[data-doc-add]")?.addEventListener("click", () => {
    const currentCount = docContainer.querySelectorAll("[data-document-item]").length;
    if (currentCount >= MAX_DOCS) return;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = createDocumentItemHTML(currentCount + 1).trim();
    const newItem = wrapper.firstElementChild;

    docContainer.appendChild(newItem);
    bindDocumentItemEvents(newItem);
    refreshDocumentItems(docContainer);

    // Scroll ke item baru
    newItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  // ── Hapus item dokumen (event delegation) ────────────────────────────────
  docContainer.addEventListener("click", async (e) => {
    const removeBtn = e.target.closest("[data-doc-remove]");
    if (!removeBtn) return;

    const item = removeBtn.closest("[data-document-item]");
    if (!item) return;

    const currentCount = docContainer.querySelectorAll("[data-document-item]").length;
    if (currentCount <= MIN_DOCS) return;

    const docId = item.dataset.docId;

    // Jika dokumen sudah tersimpan di server, hapus via API dulu
    if (docId) {
      try {
        const res = await fetch(`${API_URL}/api/documents/${docId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Gagal menghapus dokumen");
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat menghapus dokumen.");
        return;
      }
    }

    item.remove();
    refreshDocumentItems(docContainer);
  });

  // ── Preview dokumen (event delegation) ───────────────────────────────────
  docContainer.addEventListener("click", (e) => {
    const previewBtn = e.target.closest("[data-doc-preview]");
    if (!previewBtn) return;

    const url = previewBtn.dataset.docUrl;
    if (!url) return;

    const modal = document.getElementById("modal-doc-preview");
    const iframe = document.getElementById("modal-doc-preview-iframe");
    const fallback = document.getElementById("modal-doc-preview-fallback");
    const fallbackLink = document.getElementById("modal-doc-preview-link");
    const title = document.getElementById("modal-doc-preview-title");

    // Ambil nama file dari URL untuk judul
    const filename = url.split("/").pop() ?? "Dokumen";
    const item = previewBtn.closest("[data-document-item]");
    const docName = item?.querySelector("[data-doc-field='document_name']")?.value?.trim();
    if (title) title.textContent = docName || filename;

    if (iframe) iframe.src = url;
    if (fallbackLink) fallbackLink.href = url;
    if (fallback) fallback.classList.add("hidden");

    if (modal) showModal(modal);
  });

  // Reset iframe saat modal preview ditutup agar tidak ada request aktif
  document.getElementById("modal-doc-preview")?.addEventListener("modal:hide", () => {
    const iframe = document.getElementById("modal-doc-preview-iframe");
    if (iframe) iframe.src = "";
  });

  // ── Simpan semua dokumen ──────────────────────────────────────────────────
  container.querySelector("[data-save-dokumen]")?.addEventListener("click", async () => {
    const items = docContainer.querySelectorAll("[data-document-item]");
    let hasError = false;

    for (const item of items) {
      const docId = item.dataset.docId ?? "";
      const nameInput = item.querySelector("[data-doc-field='document_name']");
      const fileInput = item.querySelector("[data-doc-file-input]");

      const documentName = nameInput?.value?.trim() ?? "";
      const file = fileInput?.files?.[0] ?? null;

      // Validasi: nama dokumen wajib diisi
      if (!documentName) {
        nameInput?.focus();
        alert("Nama dokumen wajib diisi.");
        hasError = true;
        break;
      }

      // Jika dokumen baru (belum punya id), file wajib dipilih
      if (!docId && !file) {
        alert(`Pilih file PDF untuk dokumen "${documentName}".`);
        hasError = true;
        break;
      }

      try {
        let uploadedFilename = "";

        // Upload file jika ada file baru dipilih
        if (file) {
          const fd = new FormData();
          fd.append("file", file);
          const uploadRes = await fetch(`${API_URL}/api/upload?folder=documents`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: fd,
          });

          if (!uploadRes.ok) throw new Error("Gagal upload file");
          const uploadJson = await uploadRes.json();
          uploadedFilename = uploadJson.filename;
        }

        const body = {
          document_name: documentName,
          ...(uploadedFilename && { file: uploadedFilename }),
        };

        if (docId) {
          // UPDATE dokumen yang sudah ada
          const res = await fetch(`${API_URL}/api/documents/${docId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
          });
          if (!res.ok) throw new Error("Gagal memperbarui dokumen");

          // Update URL tombol view jika file baru diupload
          if (uploadedFilename) injectViewButton(item, uploadedFilename);
        } else {
          // CREATE dokumen baru
          const res = await fetch(`${API_URL}/api/documents`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              ...body,
              applicant_id: currentUser.id,
            }),
          });
          if (!res.ok) throw new Error("Gagal menyimpan dokumen");

          // Simpan ID yang baru dibuat ke data attribute agar operasi berikutnya bisa update/delete
          const created = await res.json();
          if (created?.id) {
            item.dataset.docId = String(created.id);
          }

          // Inject tombol view setelah dokumen baru tersimpan
          if (uploadedFilename) injectViewButton(item, uploadedFilename);
        }
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat menyimpan dokumen.");
        hasError = true;
        break;
      }
    }

    if (!hasError) {
      const modalSuccess = document.getElementById("modal-save-success");
      if (modalSuccess) showModal(modalSuccess);
    }
  });
};