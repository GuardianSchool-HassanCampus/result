document.getElementById('resultForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const rollNumber = document.getElementById('rollNumber').value;
    fetch('results.csv')
        .then(response => response.text())
        .then(data => {
            const results = parseCSV(data);
            const studentResults = results.filter(result => result.RollNumber === rollNumber);
            displayResults(studentResults);
        })
        .catch(error => {
            console.error('Error fetching the CSV file:', error);
        });
});

function parseCSV(data) {
    const rows = data.trim().split('\n').slice(1);
    return rows.map(row => {
        const [RollNumber, Name, Class, Subject, ObtainedMarks, TotalMarks] = row.split(',');
        return { RollNumber, Name, Class, Subject, ObtainedMarks, TotalMarks };
    });
}

function displayResults(results) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    if (results.length === 0) {
        resultDiv.innerHTML = '<p>No results found for the entered roll number.</p>';
        return;
    }
    resultDiv.innerHTML = `
        <p>Student: ${results[0].Name}</p>
        <p>Class: ${results[0].Class}</p>
        <hr>
    `;
    results.forEach(result => {
        resultDiv.innerHTML += `
            <p>Subject: ${result.Subject}</p>
            <p>Obtained Marks: ${result.ObtainedMarks}</p>
            <p>Total Marks: ${result.TotalMarks}</p>
            <hr>
        `;
    });
}
