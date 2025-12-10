function searchGrades() {
    const id = document.getElementById("studentId").value.trim();
    const resultsDiv = document.getElementById("results");

    if (!id) {
        resultsDiv.innerHTML = "<p style='color:red;'>الرجاء إدخال الرقم الأكاديمي</p>";
        return;
    }

    // البحث عن جميع المقررات الخاصة بالطالب
    const studentRecords = grades.filter(r => r["الرقم الاكاديمي"] == id);

    if (studentRecords.length === 0) {
        resultsDiv.innerHTML = "<p style='color:red;'>لم يتم العثور على بيانات لهذا الرقم الأكاديمي</p>";
        return;
    }

    // استخراج اسم المتدرب من أول سجل
    const studentName = studentRecords[0]["اسم المتدرب"];

    // بناء جدول المقررات
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
        tableHTML += `
            <tr>
                <td>${rec["اسم المقرر"]}</td>
                <td>${rec["رقم الشعبة"]}</td>
                <td>${rec["الاختبار الأول"] ?? "-"}</td>
                <td>${rec["الاختبار الثاني"] ?? "-"}</td>
            </tr>
        `;
    });

    tableHTML += "</table>";

    resultsDiv.innerHTML = tableHTML;
}
