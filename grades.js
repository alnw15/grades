async function searchGrade(autoId = "") {
    let id = autoId || document.getElementById("studentId").value.trim();
    let result = document.getElementById("result");

    if (id === "") {
        result.textContent = "الرجاء إدخال الرقم الأكاديمي.";
        return;
    }

    let response = await fetch("grades.json");
    let data = await response.json();

    // اجلب جميع الدرجات وليس سجل واحد
    let studentRecords = data.filter(s => s.id === id);

    if (studentRecords.length > 0) {

        // عرض الاسم من أول سجل
        let name = studentRecords[0].name;

        let html = `<p>الاسم: <strong>${name}</strong></p>`;
        html += `<p>عدد الدرجات: ${studentRecords.length}</p>`;

        html += `<table border="1" style="width:100%; margin-top:15px; border-collapse:collapse;">
                    <tr style="background:#ddd;">
                        <th>الدرجة</th>
                    </tr>`;

        studentRecords.forEach(r => {
            html += `<tr><td style="padding:8px; text-align:center;">${r.grade}</td></tr>`;
        });

        html += `</table>`;

        result.innerHTML = html;

    } else {
        result.textContent = "لا يوجد بيانات لهذا الرقم.";
    }
}
