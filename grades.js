async function searchGrade(autoId = "") {
    let id = autoId || document.getElementById("studentId").value.trim();
    let result = document.getElementById("result");

    if (id === "") {
        result.textContent = "الرجاء إدخال الرقم الأكاديمي.";
        return;
    }

    let response = await fetch("grades.json");
    let data = await response.json();

    let student = data.find(s => s.id === id);

    if (student) {
        result.textContent = "الاسم: " + student.name + " - الدرجة: " + student.grade;
    } else {
        result.textContent = "لا يوجد طالب بهذا الرقم.";
    }
}
