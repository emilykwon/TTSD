document.addEventListener('DOMContentLoaded', () => {
    const allOpinionsList = document.getElementById('allOpinionsList');
    const clearAllBtn = document.getElementById('clearAllBtn'); // 새로 추가된 버튼 ID

    // 로컬 스토리지에서 의견 불러오기
    function loadOpinions() {
        allOpinionsList.innerHTML = ''; // 기존 목록 비우기
        const opinions = JSON.parse(localStorage.getItem('discardedOpinions')) || [];

        if (opinions.length === 0) {
            allOpinionsList.innerHTML = '<p style="color: grey; text-align: center; width: 100%;">아직 버려진 기술이 없습니다.</p>';
            return;
        }

        opinions.forEach(opinionText => {
            const listItem = document.createElement('li');
            listItem.classList.add('opinion-list-item');
            listItem.textContent = opinionText;
            allOpinionsList.appendChild(listItem);
        });
    }

    // '모두 비우기' 버튼 클릭 이벤트 리스너
    clearAllBtn.addEventListener('click', () => {
        // 사용자에게 정말 비울 것인지 확인
        if (confirm('모든 버려진 기술을 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            localStorage.removeItem('discardedOpinions'); // 로컬 스토리지에서 데이터 삭제
            loadOpinions(); // 목록 새로 고침 (비어 있게 됨)
            alert('모든 버려진 기술이 삭제되었습니다.');
        }
    });

    loadOpinions(); // 페이지 로드 시 의견 불러오기
});