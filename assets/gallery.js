(() => {
  const galleries = [...document.querySelectorAll("[data-gallery]")];
  const dialog = document.querySelector("[data-gallery-dialog]");
  const dialogImage = dialog?.querySelector("[data-gallery-image]");
  const dialogCaption = dialog?.querySelector("[data-gallery-caption]");
  let activeGallery;

  const updateViewer = (gallery, index) => {
    gallery.selectItem(index);
    dialogImage.src = gallery.items[gallery.currentIndex].href;
    dialogImage.alt = gallery.stageImage.alt;
    dialogCaption.textContent = gallery.stageCaption.textContent;
  };

  const moveViewer = (direction) => {
    if (!activeGallery) return;

    let nextIndex = activeGallery.currentIndex;
    let attempts = 0;
    do {
      nextIndex = (nextIndex + direction + activeGallery.items.length) % activeGallery.items.length;
      attempts += 1;
    } while (
      activeGallery.items[nextIndex].dataset.galleryKind === "model" &&
      attempts < activeGallery.items.length
    );

    if (activeGallery.items[nextIndex].dataset.galleryKind !== "model") {
      updateViewer(activeGallery, nextIndex);
    }
  };

  galleries.forEach((galleryElement) => {
    const stage = galleryElement.querySelector("[data-gallery-stage]");
    const stageImageButton = stage?.querySelector("[data-gallery-stage-image-button]");
    const stageImage = stage?.querySelector("[data-gallery-stage-image]");
    const stageCaption = stage?.querySelector("[data-gallery-stage-caption]");
    const modelViewer = stage?.querySelector("[data-gallery-model]");
    const items = [...galleryElement.querySelectorAll("[data-gallery-thumbnail]")];
    const thumbnailRail = galleryElement.querySelector("[data-gallery-thumbnails]");
    const thumbnailList = galleryElement.querySelector("[data-gallery-thumbnail-list]");

    if (!stage || !stageImageButton || !stageImage || !stageCaption || !items.length) return;

    const gallery = {
      currentIndex: 0,
      items,
      stageCaption,
      stageImage,
      selectItem(index) {
        this.currentIndex = (index + this.items.length) % this.items.length;
        const item = this.items[this.currentIndex];
        const thumbnail = item.querySelector("img");
        const isModel = item.dataset.galleryKind === "model" && Boolean(modelViewer);

        stageImageButton.hidden = isModel;
        if (modelViewer) modelViewer.hidden = !isModel;

        if (isModel) {
          if (modelViewer.src !== item.href) modelViewer.src = item.href;
          modelViewer.alt = item.dataset.galleryAlt;
        } else {
          stageImage.src = item.href;
          stageImage.alt = thumbnail.alt;
          stageImageButton.setAttribute(
            "aria-label",
            `Open ${item.dataset.galleryCaption.toLowerCase()} image`,
          );
        }

        stageCaption.textContent = item.dataset.galleryCaption;
        stage.classList.toggle("gallery-stage--drawing", item.dataset.galleryKind === "drawing");
        stage.classList.toggle("gallery-stage--model", isModel);

        this.items.forEach((candidate, candidateIndex) => {
          if (candidateIndex === this.currentIndex) candidate.setAttribute("aria-current", "true");
          else candidate.removeAttribute("aria-current");
        });
      },
    };

    items.forEach((item, index) => {
      item.addEventListener("click", (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        gallery.selectItem(index);
      });
    });

    const updateRailFades = () => {
      if (!thumbnailRail || !thumbnailList) return;
      thumbnailRail.classList.toggle("can-scroll-up", thumbnailList.scrollTop > 1);
      thumbnailRail.classList.toggle(
        "can-scroll-down",
        thumbnailList.scrollTop + thumbnailList.clientHeight < thumbnailList.scrollHeight - 1,
      );
    };

    thumbnailList?.addEventListener("scroll", updateRailFades, { passive: true });
    window.addEventListener("resize", updateRailFades);
    if ("ResizeObserver" in window) new ResizeObserver(updateRailFades).observe(stage);
    updateRailFades();

    if (dialog && dialogImage && dialogCaption && typeof dialog.showModal === "function") {
      stageImageButton.addEventListener("click", () => {
        activeGallery = gallery;
        updateViewer(gallery, gallery.currentIndex);
        dialog.showModal();
      });
    }
  });

  if (!dialog || !dialogImage || !dialogCaption || typeof dialog.showModal !== "function") return;

  dialog.querySelector("[data-gallery-close]").addEventListener("click", () => dialog.close());
  dialog.querySelector("[data-gallery-previous]").addEventListener("click", () => moveViewer(-1));
  dialog.querySelector("[data-gallery-next]").addEventListener("click", () => moveViewer(1));

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") moveViewer(-1);
    if (event.key === "ArrowRight") moveViewer(1);
  });
})();
