const cards = [...document.querySelectorAll('.material-card')];
const filters = [...document.querySelectorAll('.filter')];
const emptyState = document.querySelector('.empty-state');
const dialog = document.querySelector('.article-dialog');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle('is-active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    cards.forEach((card) => {
      const matches = selected === 'all' || card.dataset.tags.split(' ').includes(selected);
      card.classList.toggle('is-hidden', !matches);
      if (matches) visible += 1;
    });
    emptyState.hidden = visible > 0;
  });
});

function closeDialog() {
  dialog.close();
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.open-card').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.material-card');
    const item = JSON.parse(card.querySelector('.material-data').textContent);
    dialog.querySelector('.dialog-category').textContent = `${item.number} / ${item.category}`;
    dialog.querySelector('.dialog-time').textContent = item.time;
    dialog.querySelector('#dialog-title').textContent = item.title;
    dialog.querySelector('.dialog-lead').textContent = item.lead;
    const body = dialog.querySelector('.dialog-body');
    body.replaceChildren(...item.body.map((paragraph) => {
      const element = document.createElement('p');
      element.textContent = paragraph;
      return element;
    }));
    dialog.querySelector('.dialog-next p').textContent = item.next;
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
});

document.querySelector('.dialog-close').addEventListener('click', closeDialog);
document.querySelector('.dialog-done').addEventListener('click', closeDialog);
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) closeDialog();
});
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
