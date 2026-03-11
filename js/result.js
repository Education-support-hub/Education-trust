// Result Checker JavaScript

document.getElementById('resultForm').addEventListener('submit', function(e) {
    e.preventDefault();
    checkResult();
});

function checkResult() {
    const examType = document.getElementById('examType').value;
    const rollNumber = document.getElementById('rollNumber').value;
    const dob = document.getElementById('dob').value;

    // Simulated result data (In real scenario, this would be fetched from a server)
    const mockResults = {
        'ssc-cgl-123456789': {
            name: 'John Doe',
            exam: 'SSC CGL',
            date: 'May 15, 2024',
            marks: 75,
            total: 100,
            status: 'QUALIFIED'
        },
        'upsc-987654321': {
            name: 'Jane Smith',
            exam: 'UPSC Civil Services',
            date: 'April 20, 2024',
            marks: 520,
            total: 750,
            status: 'QUALIFIED'
        }
    };

    const resultKey = examType + '-' + rollNumber;
    const result = mockResults[resultKey];

    if (result && verifyDOB(dob)) {
        displayResult(result);
    } else {
        showNoResults();
    }
}

function verifyDOB(dob) {
    // Simple verification - in real scenario, this would match against database
    return dob !== '';
}

function displayResult(result) {
    document.getElementById('resultForm').parentElement.style.display = 'none';
    document.getElementById('resultsDisplay').style.display = 'block';
    document.getElementById('noResultsMessage').style.display = 'none';

    document.getElementById('resultName').textContent = result.name;
    document.getElementById('resultRoll').textContent = document.getElementById('rollNumber').value;
    document.getElementById('resultExam').textContent = result.exam;
    document.getElementById('resultDate').textContent = result.date;
    document.getElementById('resultMarks').textContent = result.marks;
    document.getElementById('resultTotal').textContent = result.total;

    const percentage = Math.round((result.marks / result.total) * 100);
    document.getElementById('resultPercentage').textContent = percentage + '%';

    const statusDiv = document.getElementById('resultStatus');
    if (result.status === 'QUALIFIED') {
        statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> <strong>QUALIFIED</strong> - You have qualified for the next round.';
        statusDiv.className = 'alert alert-success mb-0';
    } else {
        statusDiv.innerHTML = '<i class="fas fa-times-circle"></i> <strong>NOT QUALIFIED</strong> - Better luck next time!';
        statusDiv.className = 'alert alert-danger mb-0';
    }

    window.scrollTo(0, 0);
}

function showNoResults() {
    document.getElementById('resultForm').parentElement.style.display = 'none';
    document.getElementById('resultsDisplay').style.display = 'none';
    document.getElementById('noResultsMessage').style.display = 'block';
}

function resetForm() {
    document.getElementById('resultForm').reset();
    document.getElementById('resultForm').parentElement.style.display = 'block';
    document.getElementById('resultsDisplay').style.display = 'none';
    document.getElementById('noResultsMessage').style.display = 'none';
}