let grades = [];

// تحميل ملف JSON من GitHub Pages
fetch("grades.json")
    .then(response => response.json())
    .then(data => {
        grades = data;
        console.log("تم تحميل الدرجات بنجاح");

        // إذا كان هناك رقم في الرابط، نفذ البحث مباشرة
        const urlParams = new URLSearchParams(window.location.search);
        const idFromUrl = urlParams.get("id");
        if (idFromUrl) {
            document.getElementById("studentId").value = idFromUrl;
            document.getElementById("studentId").style.display = "none";
            document.querySelector("button").style.display = "none";
            searchGrades(); // تشغيل البحث بعد تحميل JSON
        }
    })
    .catch(err => {
        console.error("خطأ في تحميل ملف JSON", err);
    });


function searchGrades() {
    const id = document.getElementById("studentId").value.trim();
    const resultsDiv = document.getElementById("results");

    if (!id) {
        resultsDiv.innerHTML = "<p style='color:red;'>الرجاء إدخال الرقم الأكاديمي</p>";
        return;
    }

    // تصفية السجلات حسب رقم المتدرب
    const studentRecords = grades.filter(r => r["الرقم الاكاديمي"] == id);

    if (studentRecords.length === 0) {
        resultsDiv.innerHTML = "<p style='color:red;'>لم يتم العثور على بيانات لهذا الرقم الأكاديمي</p>";
        return;
    }

    const studentName = studentRecords[0]["اسم المتدرب"];

    let tableHTML = `
        <h3>اسم المتدرب: ${studentName}</h3>
        <table>
            <tr>
                <th>المقرر</th>
                <th>رقم الشعبة</th>
                <th>الاختبار الأول</th>
                <th>الاختبار الثاني</th>
            </tr>
    `;

    studentRecords.forEach(rec => {
        let exam1 = rec["الاختبار الأول"] ?? "";
        let exam2 = rec["الاختبار الثاني"] ?? "";

        tableHTML += `
            <tr>
                <td>${rec["اسم المقرر"]}</td>
                <td>${rec["رقم الشعبة"]}</td>
                <td>${exam1}</td>
                <td>${exam2}</td>
            </tr>
        `;
    });

    tableHTML += "</table>";
    resultsDiv.innerHTML = tableHTML;
}
