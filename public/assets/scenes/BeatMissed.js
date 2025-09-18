// You can write more code here

/* START OF COMPILED CODE */

class BeatMissed extends Phaser.Scene {
  constructor() {
    super("BeatMissed");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorCreate() {
    // black_background
    const black_background = this.add.image(180, 320, "BG_1");
    black_background.scaleX = 0.3333;
    black_background.scaleY = 0.3333;

    // bm_BG
    const bm_BG = this.add.image(180, 110.82225, "new_bm_bg");
    bm_BG.scaleX = 0.3333;
    bm_BG.scaleY = 0.3333;

    // Beat_Missed_Text
    const beat_Missed_Text = this.add.text(185, 97, "", {});
    beat_Missed_Text.setOrigin(0.5, 0.5);
    beat_Missed_Text.text = "Missed \na Beat";
    beat_Missed_Text.setStyle({
      align: "center",
      color: "#fe3400",
      fontFamily: "Afolkalips",
      fontSize: "60px",
      stroke: "#fe3400",
    });

    // timer_text
    const timer_text = this.add.text(199, 609, "", {});
    timer_text.setOrigin(0.5, 0.5);
    timer_text.text = "5";
    timer_text.setStyle({
      color: "#fcb320",
      fontFamily: "Carlito-BoldItalic",
      fontSize: "24px",
      stroke: "#fcb320",
    });

    // continue_btn
    const continue_btn = this.add.image(180, 436, "bm_contiune");
    continue_btn.scaleX = 0.3333;
    continue_btn.scaleY = 0.3333;

    // gem_count
    const gem_count = this.add.text(206, 434, "", {});
    gem_count.setOrigin(0.5, 0.5);
    gem_count.text = "5";
    gem_count.setStyle({ fontFamily: "Carlito-Regular", fontSize: "30px" });

    // timer_icon
    const timer_icon = this.add.image(170, 607, "Timer_icon");
    timer_icon.scaleX = 0.5;
    timer_icon.scaleY = 0.5;

    // motivation_text
    const motivation_text = this.add.text(180, 321, "", {});
    motivation_text.setOrigin(0.5, 0.5);
    motivation_text.text = "Play on from where you stopped,\nor wait to see your score...";
    motivation_text.setStyle({
      align: "center",
      color: "#faf05e",
      fontFamily: "Carlito-Regular",
      fontSize: "22px",
      maxLines: 4,
    });
    motivation_text.setWordWrapWidth(300);

    // motivation_text_1
    const motivation_text_1 = this.add.text(161, 486, "", {});
    motivation_text_1.setOrigin(0.5, 0.5);
    motivation_text_1.text = "You have";
    motivation_text_1.setStyle({
      align: "center",
      color: "#faf05e",
      fontFamily: "Carlito-Italic",
      maxLines: 4,
    });
    motivation_text_1.setWordWrapWidth(300);

    // total_gem_count_txt
    const total_gem_count_txt = this.add.text(206, 486, "", {});
    total_gem_count_txt.setOrigin(0.5, 0.5);
    total_gem_count_txt.text = "15";
    total_gem_count_txt.setStyle({ align: "center", fontFamily: "Carlito-Italic", maxLines: 4 });
    total_gem_count_txt.setWordWrapWidth(300);

    // gem_outline
    const gem_outline = this.add.image(231, 487, "gem_outline");
    gem_outline.scaleX = 0.15;
    gem_outline.scaleY = 0.15;

    // motivation_text_2
    const motivation_text_2 = this.add.text(173, 272, "", {});
    motivation_text_2.setOrigin(0.5, 0.5);
    motivation_text_2.text = "SO CLOSE!";
    motivation_text_2.setStyle({
      align: "center",
      color: "#fcb320",
      fontFamily: "Carlito-Bold",
      fontSize: "28px",
      maxLines: 4,
    });
    motivation_text_2.setWordWrapWidth(300);

    // bm_divider
    const bm_divider = this.add.image(180, 359, "bm_divider");
    bm_divider.scaleX = 0.3333;
    bm_divider.scaleY = 0.3333;

    // motivation_text_3
    const motivation_text_3 = this.add.text(181, 384, "", {});
    motivation_text_3.setOrigin(0.5, 0.5);
    motivation_text_3.text = "Play On?";
    motivation_text_3.setStyle({
      align: "center",
      fontFamily: "Carlito-Regular",
      fontSize: "28px",
      maxLines: 4,
    });
    motivation_text_3.setWordWrapWidth(300);

    // bm_video_ad_btn
    const bm_video_ad_btn = this.add.image(185, 550, "bm_video_ad");
    bm_video_ad_btn.scaleX = 0.3333;
    bm_video_ad_btn.scaleY = 0.3333;

    // free_txt
    const free_txt = this.add.text(180, 535.8262173817607, "", {});
    free_txt.setOrigin(0.5, 0.5);
    free_txt.text = "FREE";
    free_txt.setStyle({
      align: "center",
      fontFamily: "Carlito-Regular",
      fontSize: "22px",
      maxLines: 4,
    });
    free_txt.setWordWrapWidth(300);

    // watch_add_txt
    const watch_add_txt = this.add.text(180, 559.4338962978347, "", {});
    watch_add_txt.setOrigin(0.5, 0.5);
    watch_add_txt.text = "Watch Ad";
    watch_add_txt.setStyle({
      align: "center",
      color: "#faf05e",
      fontFamily: "Carlito-Italic",
      maxLines: 4,
    });
    watch_add_txt.setWordWrapWidth(300);

    // total_gem_count_txt_1
    const total_gem_count_txt_1 = this.add.text(282, 565, "", {});
    total_gem_count_txt_1.setOrigin(0.5, 0.5);
    total_gem_count_txt_1.text = "+20";
    total_gem_count_txt_1.setStyle({
      align: "center",
      fontFamily: "Carlito-Regular",
      fontSize: "15px",
      maxLines: 4,
    });
    total_gem_count_txt_1.setWordWrapWidth(300);

    // lists
    const ui_layer = [
      gem_count,
      beat_Missed_Text,
      continue_btn,
      timer_icon,
      motivation_text,
      bm_BG,
      timer_text,
      motivation_text_1,
      total_gem_count_txt,
      gem_outline,
      motivation_text_2,
      bm_video_ad_btn,
      free_txt,
      watch_add_txt,
      total_gem_count_txt_1,
      motivation_text_3,
      bm_divider,
    ];

    this.black_background = black_background;
    this.timer_text = timer_text;
    this.continue_btn = continue_btn;
    this.gem_count = gem_count;
    this.motivation_text = motivation_text;
    this.total_gem_count_txt = total_gem_count_txt;
    this.motivation_text_2 = motivation_text_2;
    this.motivation_text_3 = motivation_text_3;
    this.bm_video_ad_btn = bm_video_ad_btn;
    this.total_gem_count_txt_1 = total_gem_count_txt_1;
    this.ui_layer = ui_layer;

    this.events.emit("scene-awake");
  }

  /** @type {Phaser.GameObjects.Image} */
  black_background;
  /** @type {Phaser.GameObjects.Text} */
  timer_text;
  /** @type {Phaser.GameObjects.Image} */
  continue_btn;
  /** @type {Phaser.GameObjects.Text} */
  gem_count;
  /** @type {Phaser.GameObjects.Text} */
  motivation_text;
  /** @type {Phaser.GameObjects.Text} */
  total_gem_count_txt;
  /** @type {Phaser.GameObjects.Text} */
  motivation_text_2;
  /** @type {Phaser.GameObjects.Text} */
  motivation_text_3;
  /** @type {Phaser.GameObjects.Image} */
  bm_video_ad_btn;
  /** @type {Phaser.GameObjects.Text} */
  total_gem_count_txt_1;
  /** @type {Array<Phaser.GameObjects.Text|Phaser.GameObjects.Image>} */
  ui_layer;

  /* START-USER-CODE */

  // Write your code here

  create() {
    this.analytics = this.registry.get("analytics");
    this.logAnalytics = this.registry.get("logAnalytics");
    this.sessionId = this.registry.get("sessionId");

    if (this.logAnalytics && this.sessionId) {
      this.logAnalytics(this.sessionId, "beat_missed_screen_shown");
      console.log("beat_missed_screen_shown");
    }

    this.continueCount = this.registry.get("continueCount") || 0;
    this.adShown = false; // Add this flag to track if ad was already shown

    this.editorCreate();
    this.adjustViewport();
    console.log("BeatMissed create.js()");
    this.cameras.main.shake(500, 0.0025);

    const scratch_sound = this.sound.add("scratch_sound", { volume: 0.7, loop: false });
    scratch_sound.play();

    this.button_sfx = this.registry.get("button_sfx");
    this.background_music = this.registry.get("background_music");
    this.background_music.play();

    this.checkGems();

    // this.continue_button.setInteractive()
    // this.continue_button.on('pointerup', ()=>{
    // 	this.subtractGems(5);
    // 	this.scene.stop();
    // 	this.scene.resume("Level");

    // })

    this.startAutoQuitTimer();

    // this.quit_button.setInteractive();
    // this.quit_button.on("pointerup", () => {
    //   this.scene.stop();
    //   const levelScene = this.scene.get("Level");
    //   levelScene.gameOver(); // clean-up Level scene
    //   // this.scene.stop("Level");
    // });
  }

  adjustViewport() {
    this.rexScaleOuter.scale();
    const baseWidth = 360;
    const baseHeight = 640;
    const targetWidth = 720;
    const targetHeight = 1280;

    var viewport = new Phaser.Geom.Rectangle();

    var UpdateViewport = function () {
      var innerViewport = this.rexScaleOuter.innerViewport;
      var scaleX = targetWidth / baseWidth;
      var scaleY = targetHeight / baseHeight;
      var scale = Math.min(scaleX, scaleY);

      var newWidth = baseWidth * scale;
      var newHeight = baseHeight * scale;
      var x = (targetWidth - newWidth) / 2;
      var y = (targetHeight - newHeight) / 2;

      viewport.setTo(x, y, newWidth, newHeight);
      this.cameras.main.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
      this.cameras.main.setZoom(scale);
      this.cameras.main.centerOn(baseWidth / 2, baseHeight / 2);

      this.adjustTextProperties(scale);
    }.bind(this);

    // this.scale.on("resize", UpdateViewport);
    UpdateViewport();
  }

  adjustTextProperties(scale) {
    this.children.list.forEach((child) => {
      if (child instanceof Phaser.GameObjects.Text) {
        // Font size adjustment
        if (!child.originalFontSize) {
          child.originalFontSize = parseInt(child.style.fontSize);
        }
        const newSize = Math.round(child.originalFontSize * scale);
        child.setScale(0.5).setFontSize(`${newSize}px`);

        // Word wrap width adjustment
        if (child.style.wordWrapWidth) {
          if (!child.originalWordWrapWidth) {
            child.originalWordWrapWidth = child.style.wordWrapWidth;
          }
          const newWrapWidth = Math.round(child.originalWordWrapWidth * scale);
          child.setWordWrapWidth(newWrapWidth);
        }

        // Padding adjustment
        if (child.padding) {
          if (!child.originalPadding) {
            child.originalPadding = { ...child.padding };
          }
          child.setPadding({
            left: Math.round(child.originalPadding.left * scale),
            right: Math.round(child.originalPadding.right * scale),
            top: Math.round(child.originalPadding.top * scale),
            bottom: Math.round(child.originalPadding.bottom * scale),
          });
        }

        // Line spacing adjustment
        if (child.lineSpacing !== undefined) {
          if (child.originalLineSpacing === undefined) {
            child.originalLineSpacing = child.lineSpacing;
          }
          child.setLineSpacing(Math.round(child.originalLineSpacing * scale));
        }
      }
    });
  }

  startAutoQuitTimer() {
    let timeLeft = 4;
    this.timer_text.setText(timeLeft);

    this.autoQuitTimer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        timeLeft--;
        this.timer_text.setText(timeLeft);

        if (timeLeft <= 0) {
          this.autoQuit();
        }
      },
      repeat: 3,
    });
  }

  autoQuit() {
    if (this.logAnalytics && this.sessionId) {
      this.logAnalytics(this.sessionId, "beat_missed_timeout");
      console.log("beat_missed_timeout");
    }

    this.background_music.stop();
    this.scene.stop();
    const levelScene = this.scene.get("Level");
    levelScene.gameOver(); // clean-up Level scene
  }

  checkGems() {
    let user_data = JSON.parse(localStorage.getItem("user_data"));
    const total_gems = user_data.profile.player.total_gems;

    const continueCost = (this.continueCount + 1) * 5; // Calculate the cost
    this.total_gem_count_txt.setText(total_gems);
    this.gem_count.setText(continueCost);

    if (this.logAnalytics && this.sessionId) {
      this.logAnalytics(this.sessionId, `beat_missed_continue_cost, ${parseFloat(continueCost)}`);
      this.logAnalytics(this.sessionId, `beat_missed_total_gems, ${parseFloat(total_gems)}`);
      console.log(
        `beat_missed_continue_cost, ${continueCost}, beat_missed_total_gems, ${total_gems}`
      );
    }

    // Initially disable the button
    this.continue_btn.disableInteractive();
    // this.continue_btn.setAlpha(0.5); // Optional: make it look disabled

    if (total_gems < continueCost) {
      this.motivation_text.setText(`Insufficient gems to continue. Need ${continueCost} gems.`);
      this.continue_btn.setTint(0x888888); // Gray out the button
    } else {
      // this.motivation_text.setText(`Continue for ${continueCost} gems?`);
      this.continue_btn.clearTint(); // Remove the gray tint

      // Set a timer to enable the button after 1 second
      this.time.delayedCall(800, () => {
        this.continue_btn.setInteractive();
        this.continue_btn.setAlpha(1); // Optional: restore full opacity

        // Add the click event listener here
        this.continue_btn.once("pointerup", () => {
          if (this.logAnalytics && this.sessionId) {
            this.logAnalytics(this.sessionId, "beat_missed_continue_clicked");
            console.log("beat_missed_continue_clicked");
          }
          this.subtractGems(continueCost);
          this.background_music.stop();
          this.countDown();
        });
      });
    }

    this.time.delayedCall(800, () => {
      this.bm_video_ad_btn.setInteractive();
      this.bm_video_ad_btn.once("pointerup", () => {
        if (this.logAnalytics && this.sessionId) {
          this.logAnalytics(this.sessionId, "beat_missed_video_ad_clicked");
          console.log("beat_missed_video_ad_clicked");
        }
        this.showAd();
      });
    });
  }

  showAd() {
    // Prevent multiple ad calls
    if (this.adShown) {
      console.log("Ad already shown, ignoring request");
      return;
    }

    console.log("Ad button clicked");
    this.adShown = true; // Set flag to prevent multiple calls

    // Disable the ad button to prevent multiple clicks
    this.bm_video_ad_btn.disableInteractive();
    this.bm_video_ad_btn.setTint(0x888888); // Gray out the button

    // Show real AdSense ad
    if (window.adsbygoogle) {
      console.log("Attempting to show AdSense ad");
      try {
        // Create proper DOM element for AdSense
        const adContainer = document.createElement('div');
        adContainer.id = 'beatmissed-ad-container';
        adContainer.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999; width: 90%; max-width: 320px;';
        
        const adElement = document.createElement('ins');
        adElement.className = 'adsbygoogle';
        adElement.style.cssText = 'display: block; width: 100%;';
        adElement.setAttribute('data-ad-client', 'ca-pub-6193376247880661');
        adElement.setAttribute('data-ad-slot', '6804075243');
        adElement.setAttribute('data-ad-format', 'auto');
        adElement.setAttribute('data-full-width-responsive', 'true');
        
        adContainer.appendChild(adElement);
        document.body.appendChild(adContainer);
        
        // Initialize the ad
        (window.adsbygoogle = window.adsbygoogle || []).push({});

        // Set up observer to detect when ad loads
        const observer = new MutationObserver(() => {
          if (adElement.querySelector('iframe')) {
            console.log("Ad iframe detected, ad loaded successfully");
            if (this.logAnalytics && this.sessionId) {
              this.logAnalytics(this.sessionId, "beat_missed_video_ad_shown_successfully");
              console.log("beat_missed_video_ad_shown_successfully");
            }
            observer.disconnect();
            
            // Wait for user to "watch" the ad before rewarding
            setTimeout(() => {
              this.cleanupAd();
              this.rewardGemsAfterAd();
            }, 8000); // 8 seconds watch time
          }
        });
        
        observer.observe(adElement, { childList: true, subtree: true });
        
        // Fallback timeout in case ad doesn't load
        setTimeout(() => {
          if (!adElement.querySelector('iframe')) {
            console.log("Ad failed to load within timeout");
            observer.disconnect();
            this.cleanupAd();
            this.handleAdFailure();
          }
        }, 5000); // 5 second timeout

      } catch (error) {
        console.log("AdSense error:", error);

        if (this.logAnalytics && this.sessionId) {
          this.logAnalytics(this.sessionId, "beat_missed_video_ad_failed");
          console.log("beat_missed_video_ad_failed:", error.message);
        }
        this.handleAdFailure();
      }
    } else {
      console.log("AdSense not available");

      if (this.logAnalytics && this.sessionId) {
        this.logAnalytics(this.sessionId, "beat_missed_adsense_unavailable");
        console.log("beat_missed_adsense_unavailable");
      }
      // For testing - simulate ad completion
      this.rewardGemsAfterAd();
    }
  }

  cleanupAd() {
    const adContainer = document.getElementById('beatmissed-ad-container');
    if (adContainer) {
      adContainer.remove();
    }
  }

  handleAdFailure() {
    // Reset the flag and re-enable button if ad fails
    this.adShown = false;
    this.bm_video_ad_btn.setInteractive();
    this.bm_video_ad_btn.clearTint();
    this.cleanupAd();
  }

  // Add this new method
  rewardGemsAfterAd() {
    // Award 10 gems to the user
    let user_data = JSON.parse(localStorage.getItem("user_data"));
    user_data.profile.player.total_gems += 20;
    this.game.events.emit("updateUserEvent", { data: user_data });

    this.continueCount++;
    this.registry.set("continueCount", this.continueCount); // Persist it

    // Get the current song from the Level scene for analytics
    const levelScene = this.scene.get("Level");
    // const currentSong = levelScene.songItem || "unknown";

    // Track ad reward in analytics
    // this.analytics.trackResourceUse("Gems", -10, "ad_reward", currentSong);

    // Stop background music and start countdown
    this.background_music.stop();
    this.countDown();
  }

  subtractGems(amount) {
    let user_data = JSON.parse(localStorage.getItem("user_data"));
    user_data.profile.player.total_gems -= amount;
    this.game.events.emit("updateUserEvent", { data: user_data });

    // Get the current song from the Level scene
    const levelScene = this.scene.get("Level");
    const currentSong = levelScene.songItem || "unknown";

    // Track resource use in analytics, tied to the specific song
    this.analytics.trackResourceUse("Gems", amount, "continue", currentSong);

    this.continueCount++;
    this.registry.set("continueCount", this.continueCount); // Persist it
  }

  destroy() {
    // Clean up any remaining ad elements when scene is destroyed
    this.cleanupAd();
    super.destroy();
  }

  countDown() {
    if (this.autoQuitTimer) {
      this.autoQuitTimer.remove();
    }

    this.screenWidth = 360; // this.cameras.main.width;
    this.screenHeight = 640; //this.cameras.main.height;
    this.screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
    this.screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;
    let countdown_sfx = this.sound.add("countdown_sfx", {
      volume: 0.7,
      loop: false,
    });

    this.ui_layer.forEach((child) => {
      child.setAlpha(0);
      child.setScale(0);
    });

    // this.overlay.setDepth(5);

    this.initialTime = 3;
    this.continuing_text = this.add
      .text(this.screenCenterX, this.screenCenterY - 50, "Continuing In: ", {
        fontFamily: "Carlito-Italic",
        fontSize: "26px",
        fill: "#fe3400",
      })
      .setOrigin(0.5, 1)
      .setDepth(6)
      .setScale(0)
      .setAlpha(0);

    this.tweens.add({
      targets: this.continuing_text,
      scale: 1,
      alpha: 1,
      ease: "Linear",
      duration: 100,
    });

    this.countDownText = this.add
      .text(this.screenCenterX, this.screenCenterY + 20, this.initialTime, {
        fontFamily: "Afolkalips",
        fontSize: "85px",
        fill: "#fe3400",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(6)
      .setScale(1)
      .setAlpha(1);

    this.tweens.add({
      targets: [this.countDownText],
      scaleX: 2,
      scaleY: 2,
      alpha: 0.1,
      duration: 250, // Reduced duration for faster animation
      yoyo: true,
      ease: "Power2",
    });

    countdown_sfx.play();

    const intervalId = setInterval(() => {
      this.initialTime--;
      this.countDownText.setText(this.initialTime);

      if (this.initialTime === 0) {
        this.sound.play("countdown_sfx", { volume: 1, loop: false });
      } else {
        countdown_sfx.play();
      }

      this.tweens.add({
        targets: [this.countDownText],
        scaleX: 2,
        scaleY: 2,
        alpha: 0.1,
        duration: 250, // Reduced duration for faster animation
        yoyo: true,
        ease: "Power2",
      });

      if (this.initialTime <= 0) {
        this.countDownText.destroy();
        this.continuing_text.destroy();

        this.tweens.add({
          targets: this.overlay,
          alpha: 0,
          ease: "Linear",
          duration: 250, // Reduced duration for faster fade out
          onComplete: () => {
            this.overlay.setVisible(false);
            this.overlay.setAlpha(1);
          },
        });

        // this.createMusic();
        // this.createTileGroup();
        // this.pause_btn.setInteractive().setDepth(50);
        // clearInterval(intervalId);

        this.scene.stop();
        this.scene.resume("Level");
        clearInterval(intervalId);
      }
    }, 1000); // Reduced interval for faster countdown
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
