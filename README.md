# phishing-protecter

<img width=20% alt="icon" src="https://user-images.githubusercontent.com/52380218/136557208-e5fda7bd-0beb-4bee-826f-8db932712aee.png">


## Constructions protecting you from phishing sites
Is your PC really safe? Are you visitting bad sites?

This prevents your PC from getting caught on phishing sites by alerting.


## INSTALLATION
1. You download all package of "phishing-protector" and save it on an arbitrary place.
   - Run `git clone https://github.com/jinkaiRuby2021/phishing-protecter.git` on your terminal.
   - Or download the zip file directly from this site and extract it.
2. Then you load the file to google extensions from **"Load unpackaged"**.

<img width=60% alt="install" src="https://user-images.githubusercontent.com/52380218/136532797-f14b3a10-5986-416f-927b-f4f3d9839813.png">


## FEATURES
This Google extension has **three functions**.
- Personal Information Entry Event Warning
- Registered Personal Information Entry Warning
- SSL Not Supported Web Site Warning 

### Personal Information Entry Event Warning
When you enter personal information, this system display warning to encourage confirmation that sites you visit is wheather legitimate or phishing.

<img width=60% alt="first feature" src="https://user-images.githubusercontent.com/52380218/136556449-eeda9ad2-5e97-41bd-9a5a-91c88431bbb1.gif">

### Registered Personal Information Entry Warning
If you set up option in advance, this show alert by matching contents of option and what you are typing.

<img width=60% alt="second feature" src="https://user-images.githubusercontent.com/52380218/136556672-482ad083-e16d-4e76-b4a0-aecd779c0dfa.gif">

### SSL Not Supported Web Site Warning
If sites you visit don't support ssl, this show alert.

<img width=60% alt="third feature" src="https://user-images.githubusercontent.com/52380218/136556751-61baac4d-040d-4b51-bed1-c1b8a9184062.gif">

## Way to Use
Basically, no configuration by you is required.

Just install and activate it, and it will automatically send out warnings.

### Options
However, if you want to make sure that your personal information is protected, you can register it in advance to get a stronger warning.

When you open **options screen**, you can check the **three input forms**("Data", "Tag", "Comment").

  - First, enter the personal information you want to register in the ***"Data"*** field.
    - Personal information is hashed by **sha-256**, which prevents personal information from being leaked.
  - Second, select the ***"Tag"*** that corresponds to the data you have entered.???
    - The following **seven options** are available.???<br>CreditCard, Name, Address, TelNumber, EmailAddress, Affiliation and etc.
  - Finally, enter a description of the personal information to be registered in the ***"Comment"*** field.
    - Since your personal information is hashed, you will need to give a description that identifies you as the individual.

When you are done, click on the "Add" button to complete the registration, and the table at the bottom of the input form will display the information you have entered.
  - Each piece of information can be **edited** or **deleted**.

<img width=60% alt="options" src="https://user-images.githubusercontent.com/52380218/136532864-bbb37e6a-555f-440f-94b4-92e187a704fd.png" style="margin-left: auto">

## License
The source code is licensed MIT. The website content is licensed CC BY 4.0, see LICENSE.
