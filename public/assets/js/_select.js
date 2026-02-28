import barba from "@barba/core";
import TomSelect from "tom-select";
import "tom-select/dist/css/tom-select.css";

const initSelect = async () => {
  let fieldOfWork = [
    { id: 0, work: "Semua", disabled: false },
    { id: 1, work: "Teknologi Informasi", disabled: false },
    { id: 2, work: "Keuangan dan Perbankan", disabled: false },
    { id: 3, work: "Kesehatan", disabled: false },
    { id: 4, work: "Pendidikan", disabled: false },
    { id: 5, work: "Desain Grafis", disabled: false },
    { id: 6, work: "Pemasaran", disabled: false },
    { id: 7, work: "Sumber Daya Manusia", disabled: false },
    { id: 8, work: "Teknik", disabled: false },
    { id: 9, work: "Hukum", disabled: false },
    { id: 10, work: "Seni dan Hiburan", disabled: false },
    { id: 11, work: "Pariwisata dan Perhotelan", disabled: false },
    { id: 12, work: "Pertanian", disabled: false },
    { id: 13, work: "Manufaktur", disabled: false },
    { id: 14, work: "Konstruksi", disabled: false },
    { id: 15, work: "Riset dan Pengembangan", disabled: false },
    { id: 16, work: "Logistik", disabled: false },
    { id: 17, work: "Media dan Komunikasi", disabled: false },
    { id: 18, work: "Layanan Publik", disabled: false },
    { id: 19, work: "Bisnis dan Konsultasi", disabled: false },
    { id: 20, work: "Startup dan Kewirausahaan", disabled: false },
  ];
  let jobPositions = [
    { id: 0, position: "Semua", disabled: false },
    { id: 1, position: "Software Engineer", disabled: false },
    { id: 2, position: "Frontend Developer", disabled: false },
    { id: 3, position: "Backend Developer", disabled: false },
    { id: 4, position: "Fullstack Developer", disabled: false },
    { id: 5, position: "Data Scientist", disabled: false },
    { id: 6, position: "UI/UX Designer", disabled: false },
    { id: 7, position: "Product Manager", disabled: false },
    { id: 8, position: "Digital Marketing Specialist", disabled: false },
    { id: 9, position: "Content Writer", disabled: false },
    { id: 10, position: "Graphic Designer", disabled: false },
    { id: 11, position: "HR Specialist", disabled: false },
    { id: 12, position: "Finance & Accounting Staff", disabled: false },
    { id: 13, position: "Sales Executive", disabled: false },
    { id: 14, position: "Customer Service", disabled: false },
    { id: 15, position: "Administrative Staff", disabled: false },
    { id: 16, position: "Operations Manager", disabled: false },
    { id: 17, position: "Business Analyst", disabled: false },
    { id: 18, position: "Network Engineer", disabled: false },
    { id: 19, position: "IT Support", disabled: false },
    { id: 20, position: "Quality Assurance (QA)", disabled: false },
  ];
  let genders = [
    { id: 0, gender: "Laki-laki", value: "Laki-laki", disabled: false },
    { id: 1, gender: "Perempuan", value: "Perempuan", disabled: false },
  ];
  let provinces = [
    { id: 0, province: "Semua Provinsi", disabled: false },
    { id: 1, province: "Aceh", disabled: false },
    { id: 2, province: "Bali", disabled: false },
    { id: 3, province: "Banten", disabled: false },
    { id: 4, province: "Bengkulu", disabled: false },
    { id: 5, province: "DI Yogyakarta", disabled: false },
    { id: 6, province: "DKI Jakarta", disabled: false },
    { id: 7, province: "Gorontalo", disabled: false },
    { id: 8, province: "Jambi", disabled: false },
    { id: 9, province: "Jawa Barat", disabled: false },
    { id: 10, province: "Jawa Tengah", disabled: false },
    { id: 11, province: "Jawa Timur", disabled: false },
    { id: 12, province: "Kalimantan Barat", disabled: false },
    { id: 13, province: "Kalimantan Selatan", disabled: false },
    { id: 14, province: "Kalimantan Tengah", disabled: false },
    { id: 15, province: "Kalimantan Timur", disabled: false },
    { id: 16, province: "Kalimantan Utara", disabled: false },
    { id: 17, province: "Kepulauan Bangka Belitung", disabled: false },
    { id: 18, province: "Kepulauan Riau", disabled: false },
    { id: 19, province: "Lampung", disabled: false },
    { id: 20, province: "Maluku", disabled: false },
    { id: 21, province: "Maluku Utara", disabled: false },
    { id: 22, province: "Nusa Tenggara Barat", disabled: false },
    { id: 23, province: "Nusa Tenggara Timur", disabled: false },
    { id: 24, province: "Papua", disabled: false },
    { id: 25, province: "Papua Barat", disabled: false },
    { id: 26, province: "Papua Pegunungan", disabled: false },
    { id: 27, province: "Papua Selatan", disabled: false },
    { id: 28, province: "Papua Tengah", disabled: false },
    { id: 29, province: "Riau", disabled: false },
    { id: 30, province: "Sulawesi Barat", disabled: false },
    { id: 31, province: "Sulawesi Selatan", disabled: false },
    { id: 32, province: "Sulawesi Tengah", disabled: false },
    { id: 33, province: "Sulawesi Tenggara", disabled: false },
    { id: 34, province: "Sulawesi Utara", disabled: false },
    { id: 35, province: "Sumatera Barat", disabled: false },
    { id: 36, province: "Sumatera Selatan", disabled: false },
    { id: 37, province: "Sumatera Utara", disabled: false },
  ];
  let cityRegs = [
    { id: 0, cityReg: "Semua Kota/Kabupaten", disabled: false },
    { id: 1, cityReg: "Kabupaten Aceh Barat", disabled: false },
    { id: 2, cityReg: "Kabupaten Aceh Barat Daya", disabled: false },
    { id: 3, cityReg: "Kabupaten Aceh Besar", disabled: false },
    { id: 4, cityReg: "Kabupaten Aceh Jaya", disabled: false },
    { id: 5, cityReg: "Kabupaten Aceh Selatan", disabled: false },
    { id: 6, cityReg: "Kabupaten Aceh Singkil", disabled: false },
    { id: 7, cityReg: "Kabupaten Aceh Tamiang", disabled: false },
    { id: 8, cityReg: "Kabupaten Aceh Tengah", disabled: false },
    { id: 9, cityReg: "Kabupaten Aceh Tenggara", disabled: false },
    { id: 10, cityReg: "Kabupaten Aceh Timur", disabled: false },
    { id: 11, cityReg: "Kabupaten Aceh Utara", disabled: false },
    { id: 12, cityReg: "Kota Banda Aceh", disabled: false },
    { id: 13, cityReg: "Kota Langsa", disabled: false },
    { id: 14, cityReg: "Kota Lhokseumawe", disabled: false },
    { id: 15, cityReg: "Kota Sabang", disabled: false },
    { id: 16, cityReg: "Kota Subulussalam", disabled: false },
    { id: 17, cityReg: "Kabupaten Badung", disabled: false },
    { id: 18, cityReg: "Kabupaten Bangli", disabled: false },
    { id: 19, cityReg: "Kabupaten Buleleng", disabled: false },
    { id: 20, cityReg: "Kabupaten Gianyar", disabled: false },
    { id: 21, cityReg: "Kabupaten Jembrana", disabled: false },
    { id: 22, cityReg: "Kabupaten Karangasem", disabled: false },
    { id: 23, cityReg: "Kabupaten Klungkung", disabled: false },
    { id: 24, cityReg: "Kabupaten Tabanan", disabled: false },
    { id: 25, cityReg: "Kota Denpasar", disabled: false },
    { id: 26, cityReg: "Kabupaten Kepulauan Seribu", disabled: false },
    { id: 27, cityReg: "Kota Jakarta Barat", disabled: false },
    { id: 28, cityReg: "Kota Jakarta Pusat", disabled: false },
    { id: 29, cityReg: "Kota Jakarta Selatan", disabled: false },
    { id: 30, cityReg: "Kota Jakarta Timur", disabled: false },
    { id: 31, cityReg: "Kota Jakarta Utara", disabled: false },
  ];
  let subDistricts = [
    { id: 0, subDistrict: "Semua Kecamatan", disabled: false },
    { id: 1, subDistrict: "Cilandak", disabled: false },
    { id: 2, subDistrict: "Jagakarsa", disabled: false },
    { id: 3, subDistrict: "Kebayoran Baru", disabled: false },
    { id: 4, subDistrict: "Kebayoran Lama", disabled: false },
    { id: 5, subDistrict: "Mampang Prapatan", disabled: false },
    { id: 6, subDistrict: "Pancoran", disabled: false },
    { id: 7, subDistrict: "Pasar Minggu", disabled: false },
    { id: 8, subDistrict: "Pesanggrahan", disabled: false },
    { id: 9, subDistrict: "Setiabudi", disabled: false },
    { id: 10, subDistrict: "Tebet", disabled: false },
    { id: 11, subDistrict: "Andir", disabled: false },
    { id: 12, subDistrict: "Astanaanyar", disabled: false },
    { id: 13, subDistrict: "Bandung Kidul", disabled: false },
    { id: 14, subDistrict: "Bandung Kulon", disabled: false },
    { id: 15, subDistrict: "Bandung Wetan", disabled: false },
    { id: 16, subDistrict: "Batununggal", disabled: false },
    { id: 17, subDistrict: "Abiansemal", disabled: false },
    { id: 18, subDistrict: "Kuta", disabled: false },
    { id: 19, subDistrict: "Kuta Selatan", disabled: false },
    { id: 20, subDistrict: "Kuta Utara", disabled: false },
    { id: 21, subDistrict: "Mengwi", disabled: false },
    { id: 22, subDistrict: "Petang", disabled: false },
  ];
  let wards = [
    { id: 0, ward: "Semua Kelurahan", disabled: false },
    { id: 1, ward: "Tebet Barat", disabled: false },
    { id: 2, ward: "Tebet Timur", disabled: false },
    { id: 3, ward: "Kebon Baru", disabled: false },
    { id: 4, ward: "Bukit Duri", disabled: false },
    { id: 5, ward: "Manggarai", disabled: false },
    { id: 6, ward: "Manggarai Selatan", disabled: false },
    { id: 7, ward: "Menteng Dalam", disabled: false },
    { id: 8, ward: "Menteng", disabled: false },
    { id: 9, ward: "Gondangdia", disabled: false },
    { id: 10, ward: "Cikini", disabled: false },
    { id: 11, ward: "Kebon Sirih", disabled: false },
    { id: 12, ward: "Pegangsaan", disabled: false },
    { id: 13, ward: "Campaka", disabled: false },
    { id: 14, ward: "Ciroyom", disabled: false },
    { id: 15, ward: "Dungus Cariang", disabled: false },
    { id: 16, ward: "Garuda", disabled: false },
    { id: 17, ward: "Kebon Jeruk", disabled: false },
    { id: 18, ward: "Kuta", disabled: false },
    { id: 19, ward: "Legian", disabled: false },
    { id: 20, ward: "Seminyak", disabled: false },
    { id: 21, ward: "Tuban", disabled: false },
    { id: 22, ward: "Ketabang", disabled: false },
    { id: 23, ward: "Peneleh", disabled: false },
    { id: 24, ward: "Genteng", disabled: false },
    { id: 25, ward: "Kapasari", disabled: false },
  ];
  let BusinessTypes = [
    { id: 0, type: "Teknologi, Informasi, Komunikasi", disabled: false },
    { id: 1, type: "Industri", disabled: false },
    { id: 2, type: "Perdagangan", disabled: false },
    { id: 3, type: "Pertanian", disabled: false },
    { id: 4, type: "Perikanan", disabled: false },
    { id: 5, type: "Peternakan", disabled: false },
    { id: 6, type: "Jasa", disabled: false },
    { id: 7, type: "Pertambangan", disabled: false },
    { id: 8, type: "Transportasi", disabled: false },
    { id: 9, type: "Pariwisata", disabled: false },
    { id: 10, type: "Formal", disabled: false },
    { id: 11, type: "Lain-lain", disabled: false },
  ];

  document.querySelectorAll("#select-position").forEach((selectPosition) => {
    new TomSelect(selectPosition, {
      valueField: "id",
      labelField: "position",
      searchField: "position",
      options: jobPositions,
      create: false,
    });
  });
  document.querySelectorAll("#select-work").forEach((selectWork) => {
    new TomSelect(selectWork, {
      valueField: "id",
      labelField: "work",
      searchField: "work",
      options: fieldOfWork,
      create: false,
    });
  });
  document.querySelectorAll("#select-gender").forEach((selectGender) => {
    new TomSelect(selectGender, {
      valueField: "id",
      labelField: "gender",
      searchField: "gender",
      options: genders,
      create: false,
      items: ["Laki-laki"],
    });
  });

  // document.querySelectorAll('#select-province').forEach((selectProvince) => {
  //     new TomSelect(selectProvince, {
  //         valueField: 'id',
  //         labelField: 'province',
  //         searchField: 'province',
  //         options: provinces,
  //         create: false,
  //     })
  // })
  document.querySelectorAll("#select-province").forEach((selectProvince) => {
    // Kalau sudah diinit sebelumnya (misal oleh barba), destroy dulu
    if (selectProvince.tomselect) selectProvince.tomselect.destroy();

    new TomSelect(selectProvince, {
      create: false,
    });
  });

  // document.querySelectorAll('#select-cityreg').forEach((selectCityReg) => {
  //     new TomSelect(selectCityReg, {
  //         valueField: 'id',
  //         labelField: 'cityReg',
  //         searchField: 'cityReg',
  //         options: cityRegs,
  //         create: false,
  //     })
  // })
  document.querySelectorAll("#select-cityreg").forEach((el) => {
    if (el.tomselect) el.tomselect.destroy();
    new TomSelect(el, { create: false });
  });

  // document.querySelectorAll('#select-subdistrict').forEach((selectSubDistrict) => {
  //     new TomSelect(selectSubDistrict, {
  //         valueField: 'id',
  //         labelField: 'subDistrict',
  //         searchField: 'subDistrict',
  //         options: subDistricts,
  //         create: false,
  //     })
  // })
  document.querySelectorAll("#select-subdistrict").forEach((el) => {
    if (el.tomselect) el.tomselect.destroy();
    new TomSelect(el, { create: false });
  });

  // document.querySelectorAll('#select-ward').forEach((selectWard) => {
  //     new TomSelect(selectWard, {
  //         valueField: 'id',
  //         labelField: 'ward',
  //         searchField: 'ward',
  //         options: wards,
  //         create: false,
  //     })
  // })
  document.querySelectorAll("#select-ward").forEach((el) => {
    if (el.tomselect) el.tomselect.destroy();
    new TomSelect(el, { create: false });
  });

  document.querySelectorAll("#select-business").forEach((selectBusiness) => {
    new TomSelect(selectBusiness, {
      valueField: "id",
      labelField: "type",
      searchField: "type",
      options: BusinessTypes,
      create: false,
    });
  });

  document.querySelectorAll(".ts-dropdown-content").forEach((el) => {
    el.setAttribute("data-lenis-prevent", "");
  });
};

barba.hooks.beforeEnter(async () => {
  await initSelect();
});
