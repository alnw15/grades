let grades = [];
let operations = [];

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


// تحميل ملف العمليات والمخالفات
fetch("operations.json")
    .then(response => response.json())
    .then(data => {
        operations = data;
        console.log("تم تحميل العمليات والمخالفات بنجاح");
    })
    .catch(err => console.error("خطأ في تحميل operations.json", err));


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
        <h4>الرقم الأكاديمي: ${id}</h4>

        <table>
            <tr>
                <th>المقرر</th>
                <th>رقم الشعبة</th>
                <th>الاختبار الأول 20</th>
                <th>الاختبار الثاني 20</th>
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
    ////////////////////////////////
    // --- عرض العمليات والمخالفات ---
    const studentOps = operations.filter(op => op["الرقم الاكاديمي"] == id);

    if (studentOps.length > 0) {

        tableHTML += `
        <h3 style="margin-top:30px;">العمليات والمخالفات</h3>
        <table>
            <tr>
                <th>العملية</th>
                <th>التكرار</th>
                <th>التاريخ</th>
                <th>السبب</th>
            </tr>
    `;

        studentOps.forEach(op => {
            tableHTML += `
            <tr>
                <td>${op["العملية"] ?? ""}</td>
                <td>${op["التكرار"] ?? ""}</td>
                <td>${op["التاريخ"] ?? ""}</td>
                <td>${op["السبب"] ?? ""}</td>
            </tr>
        `;
        });

        tableHTML += "</table>";
    } else {
        tableHTML += `
        <h3 style="margin-top:30px;">العمليات والمخالفات</h3>
        <p style="color:#777;">لا توجد عمليات أو مخالفات لهذا المتدرب.</p>
    `;
    }

    ///////////////////////////////
    resultsDiv.innerHTML = tableHTML;

}
