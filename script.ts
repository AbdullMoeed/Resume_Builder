
const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
const resumeContainer = document.getElementById('resume-container') as HTMLElement;
const generatedResume = document.getElementById('generated-resume') as HTMLElement;
const shareOptions = document.getElementById('share-options') as HTMLElement;
const resumeLink = document.getElementById('resume-link') as HTMLAnchorElement;
const copyLinkBtn = document.getElementById('copy-link-btn') as HTMLButtonElement;
const downloadPdfBtn = document.getElementById('download-pdf-btn') as HTMLButtonElement;


resumeForm.addEventListener('submit', (event: Event) => {
    event.preventDefault(); 

    
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const work = (document.getElementById('work') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');

    
    const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;
    const profilePicFile = profilePicInput.files ? profilePicInput.files[0] : null;

    if (profilePicFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const profilePicURL = e.target?.result;

            
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

            
            resumeContainer.classList.remove('hidden');
            shareOptions.classList.remove('hidden');

            
            const uniqueURL = `https://${username}.vercel.app/resume`;
            resumeLink.href = uniqueURL;
            resumeLink.textContent = uniqueURL;

            
            copyLinkBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(uniqueURL);
                alert("Resume link copied to clipboard!");
            });

            
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

       
        reader.readAsDataURL(profilePicFile);
    } else {
        alert("Please upload a valid JPG profile picture.");
    }
});
