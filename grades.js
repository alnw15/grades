// تحميل ملف الدرجات
async function loadGrades() {
    try {
        const response = await fetch("grades.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("خطأ في تحميل ملف الدرجات:", error);
    }
}

// البحث عن المتدرب
async function searchById(studentId) {
    const grades = await loadGrades();
    if (!grades) return null;

    // استخدام المفتاح الصحيح من JSON
    return grades.find(std => String(std["الرقم الاكاديمي"]) === String(studentId));
}

// عرض النتيجة
async function showStudent() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.getElementById("result").innerHTML =
            "<p style='color:red'>لم يتم تمرير رقم أكاديمي في الرابط</p>";
        return;
    }

    const student = await searchById(id);

    if (!student) {
        document.getElementById("result").innerHTML =
            "<p style='color:red'>لم يتم العثور على بيانات لهذا الرقم الأكاديمي</p>";
        return;
    }

    // تجهيز الدرجات
    const exam1 = student["الاختبار الأول"] ?? "—";
    const exam2 = student["الاختبار الثاني"] ?? "—";
    document.getElementById("result").innerHTML = `
        <div class="card">
            <h3>بيانات المتدرب</h3>
            <p><strong>الاسم:</strong> ${student["اسم المتدرب"]}</p>
            <p><strong>الرقم الأكاديمي:</strong> ${student["الرقم الاكاديمي"]}</p>
            <p><strong>التخصص:</strong> ${student["التخصص"]}</p>
            <p><strong>المقرر:</strong> ${student["اسم المقرر"]}</p>
            <p><strong>رقم الشعبة:</strong> ${student["رقم الشعبة"]}</p>

            <h3>الدرجات</h3>
            <p><strong>الاختبار الأول:</strong> ${exam1}</p>
            <p><strong>الاختبار الثاني:</strong> ${exam2}</p>
        </div>
    `;
}

showStudent();
