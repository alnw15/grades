async function searchGrades() {
    const id = document.getElementById("studentId").value.trim();

    const response = await fetch("grades.json");
    const data = await response.json();

    // فلترة كل المقررات لنفس الرقم الأكاديمي
    const subjects = data.filter(s => s["الرقم الاكاديمي"] == id);

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (subjects.length === 0) {
        resultsDiv.innerHTML = "<p style='color:red;'>لم يتم العثور على بيانات لهذا الرقم الأكاديمي.</p>";
        return;
    }

    // عرض اسم المتدرب مرة واحدة
    resultsDiv.innerHTML += `
        <h3>اسم المتدرب: ${subjects[0]["اسم المتدرب"]}</h3>
        <h4>الرقم الأكاديمي: ${id}</h4>
        <hr>
        <h3>المقررات والدرجات:</h3>
    `;

    // جدول لكل المواد
    let table = `
        <table border="1" style="width:100%; border-collapse: collapse; text-align:center;">
            <tr>
                <th>اسم المقرر</th>
                <th>رقم الشعبة</th>
                <th>الاختبار الأول</th>
                <th>الاختبار الثاني</th>
            </tr>
    `;

    subjects.forEach(sub => {
        table += `
            <tr>
                <td>${sub["اسم المقرر"]}</td>
                <td>${sub["رقم الشعبة"]}</td>
                <td>${sub["الاختبار الأول"]}</td>
                <td>${sub["الاختبار الثاني"]}</td>
            </tr>
        `;
    });

    table += "</table>";

    resultsDiv.innerHTML += table;
}
