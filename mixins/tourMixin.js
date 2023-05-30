import Shepherd from 'shepherd.js';
import '~/assets/css/shepherd.css';


export default {
    methods: {
        startTour(store) {
            const tour = new Shepherd.Tour({
              useModalOverlay: true,
              defaultStepOptions: {
                // cancelIcon: {
                //   enabled: true
                // },
                classes: 'class-1 class-2',
                scrollTo: { behavior: 'smooth', block: 'center' }
              }
            });
      
            tour.addStep({
              title: 'Asset Page',
              text: `Upload your project's assets `,
              attachTo: {
                element: '.dashboard1',
                on:  window.innerWidth <= 1024 ? false : 'right'
              },
              buttons: [
                {
                  action() {
                    return tour.cancel();
                  },
                  classes: 'shepherd-button-secondary',
                  text: 'Skip Tour'
                },
                {
                  action: () => { 
                    if (window.innerWidth <= 1024) { 
                        store.store.commit("tourStore/setOpenSidebar", false);
                      }
                    tour.next(); 
                  },
                  text: 'Next',
                }
              ],
              id: 'creating2',
            });
      
            tour.addStep({
              text: `Upload your images and metadata under "Assets"`,
              attachTo: {
                element: '.asset1',
                on: 'bottom'
              },
              buttons: [
                {
                  action:() => {
                    if (window.innerWidth <= 1024) { 
                        store.store.commit("tourStore/setOpenSidebar", true)
                    }
                      tour.back();
                  },
                  classes: 'shepherd-button-secondary',
                  text: 'Back'
                },
                {
                  action: () => {
                    this.$router.push('/dashboard/');
                    if (window.innerWidth <= 1024) { 
                        store.store.commit("tourStore/setOpenSidebar", true)
                    }
                    tour.next();
                  },
                  text: 'Next'
                }
              ],
              id: 'creating'
            });
      
            tour.addStep({
              title: 'Lauchpad Page',
              text: `Create your launchpad`,
              attachTo: {
                element: '.dashboard2',
                on:  window.innerWidth <= 1024 ? false : 'right'
              },
              buttons: [
                {
                  action: () => {
                    this.$router.push('/dashboard/assets/');
                    if (window.innerWidth <= 1024) { 
                        store.store.commit("tourStore/setOpenSidebar", false);
                      }
                    tour.back();
                  },
                  classes: 'shepherd-button-secondary',
                  text: 'Back'
                },
                {
                  action:() => {
                    if (window.innerWidth <= 1024) { 
                        store.store.commit("tourStore/setOpenSidebar", false);
                      }
                     tour.next();
                  },
                  text: 'Next'
                }
              ],
              id: 'creating3'
            });
      
            tour.addStep({
              text: `Create your own launchpad on “Create your collection"`,
              attachTo: {
                element: '.collection1',
                on: 'bottom'
              },
              buttons: [
                {
                  action: () => {
                    this.$router.push('/dashboard/assets/');
                    if (window.innerWidth <= 1024) { 
                        store.store.commit("tourStore/setOpenSidebar", true)
                    }
                    tour.back();
                  },
                  classes: 'shepherd-button-secondary',
                  text: 'Back'
                },
                {
                  action: () => {
                    this.$router.push('/dashboard/whitelist/');
                    if (window.innerWidth <= 1024) { 
                        store.store.commit("tourStore/setOpenSidebar", true)
                    }
                    tour.next();
                  },
                  text: 'Next'
                }
              ],
              id: 'creating'
            });
      
            tour.addStep({
              title: 'Whitelist Page',
              text: `To run WL campaign`,
              attachTo: {
                element: '.dashboard3',
                on:  window.innerWidth <= 1024 ? false : 'right'
              },
              buttons: [
                {
                  action: () => {
                    this.$router.push('/dashboard');
                    if (window.innerWidth <= 1024) { 
                        store.store.commit("tourStore/setOpenSidebar", false);
                      }
                    tour.back();
                  },
                  classes: 'shepherd-button-secondary',
                  text: 'Back'
                },
                {
                  action:() => {
                    if (window.innerWidth <= 1024) { 
                        store.store.commit("tourStore/setOpenSidebar", true);
                      }
                    this.$router.push('/dashboard/auction');
                    tour.next();
                  },
                  text: 'next'
                }
              ],
              id: 'creating4'
            });

            tour.addStep({
                title: 'Auction Page',
                text: `Place your minted and mineable 1/1`,
                attachTo: {
                  element: '.dashboard4',
                  on:  window.innerWidth <= 1024 ? false : 'right'
                },
                buttons: [
                  {
                    action: () => {
                      this.$router.push('/dashboard/whitelist');
                      if (window.innerWidth <= 1024) { 
                          store.store.commit("tourStore/setOpenSidebar", true);
                        }
                      tour.back();
                    },
                    classes: 'shepherd-button-secondary',
                    text: 'Back'
                  },
                  {
                    action:() => {
                      if (window.innerWidth <= 1024) { 
                          store.store.commit("tourStore/setOpenSidebar", false);
                        }
                      tour.next();
                    },
                    text: 'next'
                  }
                ],
                id: 'creating5'
              });

              tour.addStep({ 
                text: ` Mint your 1/1 Art and place to auction`,
                attachTo: {
                  element: '.auction1',
                  on: 'bottom'
                },
                buttons: [
                  {
                    action: () => { 
                      if (window.innerWidth <= 1024) { 
                          store.store.commit("tourStore/setOpenSidebar", false);
                        }
                      tour.back();
                    },
                    classes: 'shepherd-button-secondary',
                    text: 'Back'
                  },
                  {
                    action:() => {
                      if (window.innerWidth <= 1024) { 
                          store.store.commit("tourStore/setOpenSidebar", false);
                        }
                      tour.next();
                    },
                    text: 'next'
                  }
                ],
                id: 'creating'
              });

              tour.addStep({ 
                text: ` Explore your  NFT collection`,
                attachTo: {
                  element: '.auction2',
                  on: 'bottom'
                },
                buttons: [
                  {
                    action: () => { 
                      if (window.innerWidth <= 1024) { 
                          store.store.commit("tourStore/setOpenSidebar", false);
                        }
                      tour.back();
                    },
                    classes: 'shepherd-button-secondary',
                    text: 'Back'
                  },
                  {
                    action:() => {
                      if (window.innerWidth <= 1024) { 
                          store.store.commit("tourStore/setOpenSidebar", false);
                        }
                      tour.next();
                    },
                    text: 'next'
                  }
                ],
                id: 'creating'
              });

              tour.addStep({ 
                text: `Find the list of your Auctions`,
                attachTo: {
                  element: '.auction3',
                  on: 'bottom'
                },
                buttons: [
                  {
                    action: () => { 
                      if (window.innerWidth <= 1024) { 
                          store.store.commit("tourStore/setOpenSidebar", false);
                        }
                      tour.back();
                    },
                    classes: 'shepherd-button-secondary',
                    text: 'Back'
                  },
                  {
                    action:() => {
                      if (window.innerWidth <= 1024) { 
                          store.store.commit("tourStore/setOpenSidebar", false);
                        }
                      tour.complete();
                    },
                    text: 'complete'
                  }
                ],
                id: 'creating'
              });
      
            this.tour = tour;
            this.$router.push('/dashboard/assets');
            if (window.innerWidth <= 1024) { 
                store.store.commit("tourStore/setOpenSidebar", true)
            }
            tour.start(); 
          }
    }
}