import placeHolderUrl from '../../../assets/images/placeholder-154x120.png.ts';

document.addEventListener('DOMContentLoaded', async () => {
  const modals = {
    insertimage: {
      url: placeHolderUrl,
    }
  };
  const editorEl: any = document.querySelector('#editor-demo');
  editorEl.modalElementsValue(modals);
});
