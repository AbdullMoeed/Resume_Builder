"use strict";
// Get references to the form and resume container
const resumeForm = document.getElementById('resume-form');
const resumeContainer = document.getElementById('resume-container');
const generatedResume = document.getElementById('generated-resume');
const shareOptions = document.getElementById('share-options');
const resumeLink = document.getElementById('resume-link');
const copyLinkBtn = document.getElementById('copy-link-btn');
const downloadPdfBtn = document.getElementById('download-pdf-btn');
// Handle form submission
resumeForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    // Capture user input
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const education = document.getElementById('education').value;
    const work = document.getElementById('work').value;
    const skills = document.getElementById('skills').value.split(',');
    // Capture profile picture file
    const profilePicInput = document.getElementById('profile-pic');
    const profilePicFile = profilePicInput.files ? profilePicInput.files[0] : null;
    if (profilePicFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            const profilePicURL = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            // Dynamically generate the resume
            generatedResume.innerHTML = `
                <div class="personal-info">
                    <img src="${profilePicURL}" alt="Profile Picture" class="profile-pic">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                </div>
                <h3>Education</h3>
                <p>${education}</p>
                <h3>Work Experience</h3>
                <p>${work}</p>
                <h3>Skills</h3>
                <ul>${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}</ul>
            `;
            // Show the resume container and share options
            resumeContainer.classList.remove('hidden');
            shareOptions.classList.remove('hidden');
            // Generate the unique URL for sharing
            const uniqueURL = `https://${username}.vercel.app/resume`;
            resumeLink.href = uniqueURL;
            resumeLink.textContent = uniqueURL;
            // Add event listener for copying the link
            copyLinkBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(uniqueURL);
                alert("Resume link copied to clipboard!");
            });
            // Add event listener for downloading as PDF
            downloadPdfBtn.addEventListener('click', () => {
                const opt = {
                    margin: 1,
                    filename: `${username}_resume.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                };
                html2pdf().from(generatedResume).set(opt).save();
            });
        };
        // Read the profile picture file as a Data URL
        reader.readAsDataURL(profilePicFile);
    }
    else {
        alert("Please upload a valid JPG profile picture.");
    }
});
