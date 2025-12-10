// تحميل ملف JSON من نفس المجلد أو من GitHub
async function loadGrades() {
    try {
        const response = await fetch("grades.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("خطأ في تحميل ملف الدرجات:", error);
    }
}

// دالة البحث باستخدام الرقم الأكاديمي
async function searchById(studentId) {
    const grades = await loadGrades();
    if (!grades) return null;

    // البحث عن الطالب
    return grades.find(std => std["الرقم_الأكاديمي"] == studentId);
}

// دالة لعرض البيانات في الصفحة
async function showStudent() {
    // إذا الرقم جاء من الرابط مباشرة
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

    // عرض البيانات
    document.getElementById("result").innerHTML = `
        <div class="card">
            <h3>بيانات المتدرب</h3>
            <p><strong>الاسم:</strong> ${student["اسم_المتدرب"]}</p>
            <p><strong>الرقم الأكاديمي:</strong> ${student["الرقم_الأكاديمي"]}</p>
            <p><strong>التخصص:</strong> ${student["التخصص"]}</p>
            <p><strong>المقرر:</strong> ${student["اسم_المقرر"]}</p>
            <p><strong>رقم الشعبة:</strong> ${student["رقم_الشعبة"]}</p>

            <h3>الدرجات</h3>
            <p><strong>الاختبار الأول:</strong> ${student["الاختبار_الأول"]}</p>
            <p><strong>الاختبار الثاني:</strong> ${student["الاختبار_الثاني"]}</p>
        </div>
    `;
}

// تشغيل الدالة مباشرة عند فتح الصفحة
showStudent();
