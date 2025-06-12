document.addEventListener('DOMContentLoaded', () => {
    const landingTrashCan = document.getElementById('landingTrashCan');

    if (landingTrashCan) {
        landingTrashCan.addEventListener('click', () => {
            window.location.href = 'main_page.html'; // 메인 페이지로 이동
        });
    }
});