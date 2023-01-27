## Frontend Release Notes

* ##### v5.9.0 - 2023-01-26

  * Block YANG Search for input less than 3 characters [#9](https://github.com/YangCatalog/frontend/issues/9)
  * Bugfix: Correctly display end dates for running cronjobs [#20](https://github.com/YangCatalog/frontend/issues/20)
  * 'Include Drafts' checkbox added to the YANG Search options [#13](https://github.com/YangCatalog/frontend/issues/13)

* ##### v5.8.0 - 2022-12-20

  * Mailing list link updated [#11](https://github.com/YangCatalog/frontend/issues/11)

* ##### v5.7.0 - 2022-11-11

  * type of notifications updated for yangvalidator
  * fetching versions of validators added [#7](https://github.com/YangCatalog/frontend/issues/7)
  * checkbox to enable/disable synonyms added [#4](https://github.com/YangCatalog/frontend/issues/4)

* ##### v5.6.1 - 2022-10-10

  * Autocompletion for IETF drafts in yangvalidator page [#2](https://github.com/YangCatalog/frontend/issues/2)
  * Update to headers after xym 0.6.1 update [deployment #161](https://github.com/YangCatalog/deployment/issues/161)

* ##### v5.6.0 - 2022-09-30
  
  * web_root, admin_ui and yangcatalog-ui repositories merged into single frontend repository [deployment #154](https://github.com/YangCatalog/deployment/issues/154)
  * Overview section added to README.md files [deployment #156](https://github.com/YangCatalog/deployment/issues/156)
  * yangcatalog-ui
    *  Display list of implementations [#100](https://github.com/YangCatalog/yangcatalog-ui/issues/100)
  * admin-ui
    * Angular updated to version 13
    * 'In progress' status added to the Cronjobs Healthcheck board [#82](https://github.com/YangCatalog/admin_ui/issues/82)
    * Bugfix: Create record button displayed corectly when table is empty [#80](https://github.com/YangCatalog/admin_ui/issues/80)

* ##### v5.5.0 - 2022-08-16

  * yangcatalog-ui
    * Check if regex is valid if using regex search [#97](https://github.com/YangCatalog/yangcatalog-ui/issues/97)
    * Update to headers after yanglint v2.0.231 update [deployment #146](https://github.com/YangCatalog/deployment/issues/146)
    * Bugfix: yangvalidator API docs component displaying [#94](https://github.com/YangCatalog/yangcatalog-ui/issues/94)

* ##### v5.4.0 - 2022-07-08

  * yangcatalog-ui
    * IETF navigation tab added to YANG Modules Stats [deployment #139](https://github.com/YangCatalog/deployment/issues/139)
    * ETSI navigation tab added to YANG Modules Stats [#88](https://github.com/YangCatalog/yangcatalog-ui/issues/88)
    * Bugfix: Display warning in Impact analysis if module does not exist [#92](https://github.com/YangCatalog/yangcatalog-ui/issues/92)* 

* ##### v5.3.0 - 2022-06-06

  * yangcatalog-ui
    * Update to headers after yanglint v2.0.194 update [deployment #127](https://github.com/YangCatalog/deployment/issues/127)
    * Query params for navigation tabs [#86](https://github.com/YangCatalog/yangcatalog-ui/issues/86)
    * Bugfix: Displaying data in AllYANGPageMain table fixed [#84](https://github.com/YangCatalog/yangcatalog-ui/issues/84)
    * Bugfix: Results table slow rendering fixed [#81](https://github.com/YangCatalog/yangcatalog-ui/issues/81)
    * Notification to user if there was timeout during search [#78](https://github.com/YangCatalog/yangcatalog-ui/issues/78)
    * Notification to user if there are many search results [#76](https://github.com/YangCatalog/yangcatalog-ui/issues/76)
    * Redirect to home page if page does not exist [#73](https://github.com/YangCatalog/yangcatalog-ui/issues/73)
    * Bugfix: Title rendering fixed - now works correctly with Matomo [#65](https://github.com/YangCatalog/yangcatalog-ui/issues/65)

* ##### v5.2.0 - 2022-05-03

  * yangcatalog-ui
    * Update to headers after pyang 2.5.2 update [deployment #124](https://github.com/YangCatalog/deployment/issues/124)
    * Footer added on some pages where missing [#71](https://github.com/YangCatalog/yangcatalog-ui/issues/71)
    * Angular modules lazy-loading introduced [#70](https://github.com/YangCatalog/yangcatalog-ui/issues/70)
    * Bugfix: Fixed display of YANG Trees if revision is not available [#68](https://github.com/YangCatalog/yangcatalog-ui/issues/68)
    * Set page titles for individual pages [#60](https://github.com/YangCatalog/yangcatalog-ui/issues/60)
    * Improved images and fonts preloading [#57](https://github.com/YangCatalog/yangcatalog-ui/issues/57)

* ##### v5.1.0 - 2022-03-28

  * Various updates to the Dockerfile - speed up the building process
  * yangcatalog-ui
    * Bugfix: Formatting of newlines at private-page tables [#58](https://github.com/YangCatalog/yangcatalog-ui/issues/58)
    * Link headers added for certain resources to enable preloading [#57](https://github.com/YangCatalog/yangcatalog-ui/issues/57)
    * Size of the backgroud image decreased [#56](https://github.com/YangCatalog/yangcatalog-ui/issues/56)
    * Matomo tracker added to the YANG Catalog UI [#52](https://github.com/YangCatalog/yangcatalog-ui/issues/52)
    * Validators versions updated in private component
    * Error messages contains more user-friendly code in the Modules details tab
    * Bugfix: Deviations list display fixed [#49](https://github.com/YangCatalog/yangcatalog-ui/issues/49)
    * Module detail properties tooltips moved into modal window [#47](https://github.com/YangCatalog/yangcatalog-ui/issues/47)
    * Unique URI for nodes/leaves of individuals module parts [#43](https://github.com/YangCatalog/yangcatalog-ui/issues/43)

* ##### v5.0.0 - 2022-02-02

  * YANG Validator Swagger documentation added to the Docker build steps
  * Postman collection updated with YANG Validator requests [#12](https://github.com/YangCatalog/web_root/issues/12)
  * yangcatalog-ui
    * Improvements for displaying errors in the YANG Validator form [#45](https://github.com/YangCatalog/yangcatalog-ui/issues/45)
    * YANG Catalog API overview moved into separate component [#44](https://github.com/YangCatalog/yangcatalog-ui/issues/44)
    * Query parameters added for YANG Validator [#39](https://github.com/YangCatalog/yangcatalog-ui/issues/39)
    * Updates to headers after pyang 2.5.2 update [deployment #113](https://github.com/YangCatalog/deployment/issues/113)
    * Various improvements to the registration form [#37](https://github.com/YangCatalog/yangcatalog-ui/issues/37)
    * reCAPTCHA validation added to the registration form [#34](https://github.com/YangCatalog/yangcatalog-ui/issues/34)
    * Query tab added to the navigation menu [#32](https://github.com/YangCatalog/yangcatalog-ui/issues/32)
    * Bugfix: Display output of validation correctly [#29](https://github.com/YangCatalog/yangcatalog-ui/issues/29)

* ##### v4.3.0 - 2021-12-03

  * yangcatalog-ui
    * Node base image version updated to version 14 [#30](https://github.com/YangCatalog/yangcatalog-ui/issues/30)
    * Bugfix: Loader spinning even if nothing is being fetch from backend [#27](https://github.com/YangCatalog/yangcatalog-ui/issues/27)
  * admin-ui
    * Use npm clean install while building image [#62](https://github.com/YangCatalog/admin_ui/issues/62)
    * Rename mysql-management to users-management [#60](https://github.com/YangCatalog/admin_ui/issues/60)

* ##### v4.2.1 - 2021-10-06

  * yangcatalog-ui
    * Bugfix: YANG search form fixes [#26](https://github.com/YangCatalog/yangcatalog-ui/issues/26)
    * Display validators versions [#21](https://github.com/YangCatalog/yangcatalog-ui/issues/21)
    * Bugfix: Problem with module name validator/autocomplete fixed [#20](https://github.com/YangCatalog/yangcatalog-ui/issues/20)
    * Update headers after ConfD 7.6 release [deployment #99](https://github.com/YangCatalog/deployment/issues/99) 
    * Document title updated [#17](https://github.com/YangCatalog/yangcatalog-ui/issues/17)
    * Bugfix: Redundant scroll bars removed [#15](https://github.com/YangCatalog/yangcatalog-ui/issues/15)
    * Bugfix: Private-page statistics tables - position fixed [#13](https://github.com/YangCatalog/yangcatalog-ui/issues/13)
    * Motivation field added to registration form [#12](https://github.com/YangCatalog/yangcatalog-ui/issues/12)
  * admin-ui
    * Display registration date in the users table [#58](https://github.com/YangCatalog/admin_ui/issues/58)

* ##### v4.2.0 - 2021-09-09

  * No changes - released with other [deployment submodules](https://github.com/YangCatalog/deployment)

* ##### v4.1.0 - 2021-08-10

  * yangcatalog-ui
    * Unnecessary static files removed [#18](https://github.com/YangCatalog/web_root/issues/18)
    * Bugfix: Hrefs fixed in contribute.html page [#11](https://github.com/YangCatalog/yangcatalog-ui/issues/11)
    * Bugfix: Searched strings from inputs trimed before sending request [#10](https://github.com/YangCatalog/yangcatalog-ui/issues/10)
    * Display impact analysis for multiple modules [#8](https://github.com/YangCatalog/yangcatalog-ui/issues/8)
    * "match" status aligned in YANG Regex Validator [#7](https://github.com/YangCatalog/yangcatalog-ui/issues/7)
    * Bugfix: Not display leaf icon if module has no tree [#6](https://github.com/YangCatalog/yangcatalog-ui/issues/6)
    * Bugfix: Problem with http links and mailto hrefs [#4](https://github.com/YangCatalog/yangcatalog-ui/issues/4)
    * Basic help displayed for impact analysis [#3](https://github.com/YangCatalog/yangcatalog-ui/issues/3)
    * Bugfix: Displaying of submodules in modules details [#1](https://github.com/YangCatalog/yangcatalog-ui/issues/1)

* ##### v4.0.0 - 2021-07-09

  * php7.0 removed from frontend build process [#17](https://github.com/YangCatalog/web_root/issues/17)
  * yang2.amsl.com mailname replaced by yangcatalog.org [deployment #73](https://github.com/YangCatalog/deployment/issues/73)
  * yangcatalog-ui
    * Initial submitted version

* ##### v3.2.1 - 2021-05-04

  * No changes - released with other [deployment submodules](https://github.com/YangCatalog/deployment)

* ##### v3.2.0 - 2021-04-15

  * admin-ui
    * Logs table modified - added filename column [#53](https://github.com/YangCatalog/admin_ui/issues/53)

* ##### v3.1.0 - 2021-03-18

  * Added missing static image [#13](https://github.com/YangCatalog/web_root/issues/13)
  * admin-ui
    * Display additional information in service healthcheck card [#50](https://github.com/YangCatalog/admin_ui/issues/50)

* ##### v3.0.1 - 2021-02-26

  * rsyslog and systemd added to Docker image build [deployment #48](https://github.com/YangCatalog/deployment/issues/48)

* ##### v3.0.0 - 2021-02-10

  * Removed not needed apps from image build
  * admin-ui
    * Display additional messages in cronjob healthcheck [#46](https://github.com/YangCatalog/admin_ui/issues/46)
    * Files and folders modification date info added [#45](https://github.com/YangCatalog/admin_ui/issues/45)
    * Adding manual for yc_operators and yc_admins [#44](https://github.com/YangCatalog/admin_ui/issues/44)
    * README file updated with information about individual tabs [#26](https://github.com/YangCatalog/admin_ui/issues/26)
    * Logout functionality adjustments [#43](https://github.com/YangCatalog/admin_ui/issues/43)
    * Login component and logic removed [#42](https://github.com/YangCatalog/admin_ui/issues/42)
    * Cronjobs status added to healthcheck tab [#41](https://github.com/YangCatalog/admin_ui/issues/41)
    * Implementing OAuthService [#40](https://github.com/YangCatalog/admin_ui/issues/40)
    * Added functionality that allows to edit user records [#18](https://github.com/YangCatalog/admin_ui/issues/18)
    * Help and tooltips added to Run tab [#38](https://github.com/YangCatalog/admin_ui/issues/38)
    * Pie chart displaying disk usage [#37](https://github.com/YangCatalog/admin_ui/issues/37)
    * Labels changed through app [#36](https://github.com/YangCatalog/admin_ui/issues/36)

* ##### v2.0.0 - 2020-08-14

  * Minor changes to Dockerfile
  * admin-ui
    * Multiple log files filtering adjustments [#35](https://github.com/YangCatalog/admin_ui/issues/35)
    * More user-friendly displaying of files/folders permissions [#34](https://github.com/YangCatalog/admin_ui/issues/34)
    * Pretty print content of JSON files [#33](https://github.com/YangCatalog/admin_ui/issues/33)
    * Updates in redirect after successful login
    * Healthcheck dashboard created [#32](https://github.com/YangCatalog/admin_ui/issues/32)
    * Edited http API calls for correct communication with backend [#31](https://github.com/YangCatalog/admin_ui/issues/31)
    * Files tab - progressive render
    * Run tab - list runnng jobs (by job ID) + prevent re-rendering
    * Files tab - display file/folder metadata (size, permission ...)
    * Run tab - check job by ID
    * Run tab - use browser local storage to handle job ID
    * Run tab - add validators for form in this tab
    * Run tab - get data from BE and generate form
    * API error handling

* ##### v1.1.0 - 2020-07-16

  * Initial submitted version
