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

    // Cek apakah ada Tom Select instance
    const tsInstance = select.tomselect;

    if (tsInstance) {
      // Update via Tom Select API
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
          tsInstance.setValue(String(matched.id), true); // true = silent, no change event
        }
      }

      select.disabled = false;
      tsInstance.enable();
    } else {
      // Fallback: update native select biasa
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
  //   const $ = (id) => document.getElementById(id);

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
    // console.log(
    //   "selCityreg options BEFORE populate:",
    //   selCityreg.options.length,
    // );
    // ── Cascade otomatis saat load ──────────────────────────────────────────
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

    // ── Cascade manual ──────────────────────────────────────────────────────
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

    // ── Restore Tom Select values ─────────────────────────────────────────
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

            // ── Simpan avatar ke cache terpisah (bukan modifikasi token) ─────────────
            localStorage.setItem("avatar_cache", avatarFilename);

            // Update cookie avatar_cache agar bisa dibaca di halaman lain
            document.cookie = `avatar_cache=${avatarFilename}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;

            // ── Trigger re-render header ─────────────────────────────────────────────
            window.dispatchEvent(
              new CustomEvent("avatar:updated", {
                detail: { avatar: avatarFilename },
              }),
            );

            // ── Update preview di halaman profil ────────────────────────────────────
            const API_URL = import.meta.env.PUBLIC_API_URL;
            const newAvatarSrc = `${API_URL}/pubs/uploads/avatar/${avatarFilename}`;
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
        // alert("Informasi pribadi berhasil disimpan!");
        // showModal("modal-save-success");
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
        // alert("Data pendidikan berhasil disimpan!");
        showModal("modal-save-success");
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat menyimpan.");
      }
    });
};
