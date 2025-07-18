---
title: Free Wireguard VPN service on AWS
description: How to Create a 1 Year Free Wireguard VPN Service on AWS
lang: en
draft: false
publish: true
tags: ["vpn", "wireguard", "aws", "Amazon Web Services"]
created: 2019-04-24 09:49
---

## Free Wireguard VPN service on AWS

### The reasoning

The increase of Internet censorship by authoritarian regimes expands the blockage of useful internet resources making impossible the use of the WEB and in essence violates the fundamental right to freedom of opinion and expression enshrined in the [Universal Declaration of Human Rights](https://www.un.org/ru/documents/decl_conv/declarations/declhr.shtml).

> Article 19  
Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.

The following is the detailed 6 steps instruction for non-IT people to deploy free* [VPN service](https://en.wikipedia.org/wiki/VPN) upon [Wireguard](https://www.wireguard.com/) technology in [Amazon Web Services (AWS) cloud infrastructure](https://aws.amazon.com/ru/), using a 12 months free account, on an Instance (virtual machine) run by Ubuntu Server 18.04 LTS.

I tried to make this walkthrough as friendly as possible to people far from IT. The only thing required is assiduity in repeating the steps described below.

> Note: AWS offers [free usage tier](https://aws.amazon.com/ru/free/faqs/) for a period of 12 months limited to 15 GB of traffic monthly.

### Stages

1. Register the AWS Account.
2. Create an AWS instance.
3. Connect to AWS instance.
4. Configure Wireguard server.
5. Configure VPN Clients.
6. Verify VPN connection.

### Useful links

* [Scripts for Wireguard automated installation on AWS.](https://github.com/pprometey/wireguard_aws)
* [Discussion on Habr.com (RU)](https://habr.com/ru/post/448528/#comments)
* [Discussion on Habr.com (EN)](https://habr.com/en/post/449234/#comments)

### The authors

* [Alexey Chernyavskiy](https://github.com/pprometey)
* [Assuan Saimov](https://t.me/saimov) (english translation)

## 1. Register the AWS Free Account

To register an AWS account, you need to submit a valid phone number and a bank card (Visa or Mastercard).
AWS checks the validity of the card by deducting 1$ at registration followed by the refund.

### 1.1. Opening the AWS Management Console

Follow the link: [https://aws.amazon.com/](https://aws.amazon.com/en/), click on the **Create an AWS account** button.

![Amazon AWS Start Page](~attachments/wireguard-aws/en/register1.jpg)

### 1.2. AWS account creation

Fill in the data and click the **Continue** button.

![AWS account creation](~attachments/wireguard-aws/en/register2.jpg)

### 1.3. Contact information for AWS account

![Contact information for AWS account](~attachments/wireguard-aws/en/register3.jpg)

### 1.4. Specify billing information

Card number, expiry date, and a cardholder name.

![Specify billing information](~attachments/wireguard-aws/en/register4.jpg)

### 1.5. Account Verification

AWS verifies your phone number and debits $ 1 from your bank card. Then you should get a 4-digit code on the computer screen and receive a call from Amazon. During a call, you need to dial the 4-digit code shown on the screen.

![Account Verification](~attachments/wireguard-aws/en/register5.jpg)

### 1.6. Choosing an AWS support plan

Choose a Basic plan (free).

![Choosing an AWS support plan](~attachments/wireguard-aws/en/register6.jpg)

### Login into AWS Management Console

![Login into AWS Management Console](~attachments/wireguard-aws/en/register7.jpg)

#### 1.8. Choosing the location of the Datacenter

![Choosing the location of the Datacenter](~attachments/wireguard-aws/en/console1.jpg)

##### 1.8.1. Internet speed testing

I recommended you to run a speed test to the nearest Datacenters at [https://speedtest.net/](https://speedtest.net/) and choose the best to connect to.  

The following are the speed test results from my location:

* Singapore
![Singapore](~attachments/wireguard-aws/en/st_singapore.jpg)

* Paris
![Paris](~attachments/wireguard-aws/en/st_paris.jpg)

* Frankfurt
![Frankfurt](~attachments/wireguard-aws/en/st_frankfurt.jpg)

* Stockholm
![Stockholm](~attachments/wireguard-aws/en/st_stockholm.jpg)

* London
 ![London](~attachments/wireguard-aws/en/st_london.jpg)

The Datacenter in London shows the best speed result, so I choose it to proceed with.

## 2. Create an AWS instance

### 2.1 Create a virtual machine (instance)

#### 2.1.0. Follow the instance creation steps

##### 2.1.0.1. Go to the Instance Launch page, choose EC-2 service

![ Go to the Instance Launch page, choose EC-2 service](~attachments/wireguard-aws/en/instance0.jpg)

##### 2.1.0.2. Launch a virtual server, known as Amazon EC-2 Instance

![Launch a virtual server, known as Amazon EC-2 Instance](~attachments/wireguard-aws/en/instance0_1.jpg)

##### 2.1.0.3. Choose Amazon machine Image (Operating System) - the Ubuntu Server 18.04 LTS

![Choose Amazon machine Image (Operating System)](~attachments/wireguard-aws/en/instance0_2.jpg)

#### 2.1.1. Choose Instance type

The `t2.micro` instance type is set by default and is the right one to go with. Click the **Next: Configure Instance Details** button to proceed.

![Choose Instance type](~attachments/wireguard-aws/en/instance1.jpg)

#### 2.1.2. Configure Instance details

Disable the auto-assignment of the public IP as you will assign a static one to your Instance. Click the **Next: Add Storage** button.

![Configure Instance details](~attachments/wireguard-aws/en/instance2.jpg)

#### 2.1.3. Add storage

Specify the size of the Drive - the 16GB is enough.
Click **Next: Add Tags** button.

![Add storage](~attachments/wireguard-aws/en/instance3.jpg)

#### 2.1.4. Add Tags

If you have several instances, you may group them by tags to enable better administration. Yet, this functionality is surplus. So we skip this by pressing the **Next: Configure Security Group** button.

![Add Tags](~attachments/wireguard-aws/en/instance4.jpg)

#### 2.1.5. Opening ports

Configure the firewall by assigning open ports. The set of open ports is called the "Security Group". You need to create a new "Security Group", give it a name, a description and a UDP port (Custom UDP Rule).
In the Port Range field specify a port number from the range 49152 - 65535 of [dynamic ports](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers). In my case, I choose the 54321 port number.
Click the **Review and Launch** button to complete this step.

![Opening ports](~attachments/wireguard-aws/en/instance5.jpg)

#### 2.1.6. Review Instance Launch settings

Review and check all the settings for Instance Launch, and if all is OK click the **Launch** button.

![Review Instance Launch settings](~attachments/wireguard-aws/en/instance6.jpg)

#### 2.1.7. Creating access keys

Create or add an existing SSH key in the dialog box that you will use for remote connection to your instance.
Choose the "Create a new key pair" to generate a new key. Give it a name and click the **Download Key Pair** button to download the generated key to the PC drive. Click the **Launch Instances** button.

![Creating access keys](~attachments/wireguard-aws/en/instance7.jpg)

##### 2.1.7.1. Save private keys (.pem)

When you click the **Download Key Pair** you save the key as a  .pem file.
For better management, I assigned a ***wireguard-awskey.pem*** name to the file.

![Save private keys](~attachments/wireguard-aws/en/instance8.jpg)

#### 2.1.8. Instance Launch Summary

Next, you should see a message about the successful launch of the Instance that you have created. You can visit the list of your Instances by clicking the **View instances** button.

![Instance Launch Summary](~attachments/wireguard-aws/en/instance9.jpg)

### 2.2. Creating an external IP address

#### 2.2.1. Create an External IP

Next is the creation of an external IP address, that you will use to connect to the VPN server.
Find the **Elastic IPs** in the ***NETWORK & SECURITY*** category of the navigation panel. Click the **Allocate new address** button.

![Create an External IP](~attachments/wireguard-aws/en/elasticip1.jpg)

#### 2.2.2. External IP setup

In the next step you need to enable the ***Amazon pool*** (which is by default), and click the **Allocate** button

![External IP setup](~attachments/wireguard-aws/en/elasticip2.jpg)

#### 2.2.3. IP address overview

The next window displays an external IP address assigned by the Amazon pool. Write it down, as you will need it fo the configuration process and for VPN server setup. In this guide, as an example, I use the IP address ***4.3.2.1***.
Once you finish this step, click the **Close** button.

![IP address overview](~attachments/wireguard-aws/en/elasticip3.jpg)

#### 2.2.4. List of external IP addresses

Next, you should get a list of your public IP addresses (Elastics IPs).

![List of external IP addresses](~attachments/wireguard-aws/en/elasticip4.jpg)

#### 2.2.5. Assign an external IP to Instance

Choose the IP address from the list (see 2.2.3), and click the mouse right button for a drop-down menu.
In this menu choose the **Associate address** to assign an IP to the created Instance.

![Assign an external IP to Instance](~attachments/wireguard-aws/en/elasticip5.jpg)

#### 2.2.6. Associate address with Instance

In the drop-down menu select the created Instance, and click the **Associate** button.

![Associate address with Instance](~attachments/wireguard-aws/en/elasticip6.jpg)

#### 2.2.7. External IP assignment Summary

You should now have a created Instance with an assigned public IP address. This enables you to make a remote connection to the Instance from outside (from your PC) via SSH.

![External IP assignment Summary](~attachments/wireguard-aws/en/elasticip7.jpg)

## 3. Connect to AWS instance

[SSH](https://en.wikipedia.org/wiki/Secure_Shell) is a secure protocol to manage remote computer devices.

### 3.1. Connect from a Windows PC via SSH

Download and install a [Putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) to make a connection from the Windows PC.

#### 3.1.1. Import Private Key for Putty

##### 3.1.1.1. Import AWS key into Putty

Launch a PuTTYgen utility to match your AWS key in .pem format with a .ppk format suitable for the Putty.
To do this select **Conversions -> Import Key** from the top menu.

![Import AWS key into Putty](~attachments/wireguard-aws/en/ssh1.jpg)

##### 3.1.1.2. AWS key in PEM format

Next, choose the key that you dealt with in [2.1.7.1](create-aws-instance.html#_2-1-7-1-save-private-keys-pem)
In my case it is ***wireguard-awskey.pem***.

![AWS key in PEM format](~attachments/wireguard-aws/en/ssh2.jpg)

##### 3.1.1.3. Set the Key import parameters

At this step, you need to specify the import parameters of the Key - the ***key comment*** and the ***key passphrase***. You will need these at every connection. Also it protects the key itself with a password from unauthorized access.  
You may skip the password assignment. But this will make your connection less secure in case the key falls into the wrong hands.
Once you finish, click the **Save private key** button.

![Set the Key import parameters](~attachments/wireguard-aws/en/ssh3.jpg)

##### 3.1.1.4. Save the imported .ppk key

You can save your private key in a `.ppk` format suitable for ***Putty*** from the save file dialog box.
Specify the key name (in my case, `wireguard-awskey.ppk`) and click the **Save** button.

![Save the imported .ppk key](~attachments/wireguard-aws/en/ssh4.jpg)

#### 3.1.2. Create and configure a connection in Putty

##### 3.1.2.1. Make a connection

Run the Putty program, choose the **Session** category (it is open by default) and in the **Host Name** field enter the public IP address of the server. I remind that you got your public IP address in step [2.2.3](create-aws-instance.html#_2-2-3-ip-address-overview).
Give any name to the connection in the **Saved Session** field  (for me it is `wireguard-aws-london`). Click the **Save** button.

![Make a connection](~attachments/wireguard-aws/en/ssh5.jpg)

##### 3.1.2.2. Set a user auto-login

Choose the ***Data*** subcategory from the ***Connection*** category. Enter the Auto-login username **ubuntu** in the **Auto-login username** field. (***ubuntu*** is the standard instance user on AWS with Ubuntu).

![Set a user auto-login](~attachments/wireguard-aws/en/ssh6.jpg)

##### 3.1.2.3. Use a private key for an SSH connection

Follow the path ***Connection -> SSH -> Auth*** subcategory and click on the **Browse** button to choose the private key file.

![Use a private key for an SSH connection](~attachments/wireguard-aws/en/ssh7.jpg)

##### 3.1.2.4. Open the private key file

Specify the key that you imported earlier in step [3.1.1.4] - `wireguard-awskey.ppk`, and click the **Open** button.

![Open the private key file](~attachments/wireguard-aws/en/ssh8.jpg)

##### 3.1.2.5. Save changes and launch an SSH remote connection

In the ***Session*** category of Putty configuration window press the **Save** button to apply all the changes you made in ([3.1.2.2] - [3.1.2.4]).
Click the **Open** button to launch the ready-to-go SSH remote connection.

![Save changes and launch an SSH remote connection](~attachments/wireguard-aws/en/ssh10.jpg)

##### 3.1.2.7. Set a trust between hosts

At the first connection, you should get a warning about the lack of trust between two computers (hosts). The system asks you whether you trust the remote host. Click **Yes** to add the remote host to the trust list.

![Set a trust between hosts](~attachments/wireguard-aws/en/ssh11.jpg)

##### 3.1.2.8. Enter the password to activate the key

In a Putty terminal window enter the key password you set in step
[3.1.1.3]. When entering the password it does not show any action on the screen. No worries, if you make a mistake, you can use the backspace key.

![Enter the password to activate the key](~attachments/wireguard-aws/en/ssh12.jpg)

##### 3.1.2.9. Successful connection

Once you enter the correct password, you should get a welcome text. It informs you that the remote system is ready to execute your commands.

![Successful connection](~attachments/wireguard-aws/en/ssh13.jpg)

## 4. Configure Wireguard server

Below is the instruction for a script-driven Wireguard installation and management.
I keep the latest version of the instruction in the repository: [https://github.com/pprometey/wireguard_aws](https://github.com/pprometey/wireguard_aws)

### 4.1. Install Wireguard

Enter the following commands in the Putty terminal.
You can copy them to the clipboard, and paste in the terminal by pressing the right mouse button.

#### 4.1.1. Clone the scripts repository

Clone a Wireguard installation scripts repository:

```sh
git clone https://github.com/pprometey/wireguard_aws.git wireguard_aws
```

#### 4.1.2. Directory of scripts repository

Go to the directory of the cloned repository:

```sh
cd wireguard_aws
```

#### 4.1.3 Initialization script

Run the Wireguard installation script under admin (root user) rights:

```sh
sudo ./initial.sh
```

The script asks you to provide the following data to configure Wireguard.

##### 4.1.3.1. Set connection endpoint (IP:port)

Enter the external IP address (see [2.2.3]) and the open port (see [2.1.5]) of the Wireguard server. Use the following format ***IP:port***, for example, `4.3.2.1:54321`. Press Enter key to confirm.

```sh
Enter the endpoint (external ip and port) in format[ipv4:port] (e.g. 4.3.2.1:54321): 4.3.2.1:54321
```

##### 4.1.3.2. Set internal IP address

Enter the IP address of the Wireguard server in a secure VPN subnet. If you do not know what it is, press Enter key to set the default value (`10.50.0.1`).

```sh
Enter the server address in the VPN subnet (CIDR format) ([ENTER] set to default: 10.50.0.1):
```

##### 4.1.3.3. Specify DNS Server

Enter the IP address of the DNS server, or press Enter key to set the default value `1.1.1.1` (Cloudflare public DNS).

```sh
Enter the ip address of the server DNS (CIDR format) ([ENTER] set to default: 1.1.1.1):
```

##### 4.1.3.4. Specify WAN Interface

Enter the name of the external network interface. This interface will sense the internal network interface of the VPN.
Press Enter to set the default for AWS (`eth0`)

```sh
Enter the name of the WAN network interface ([ENTER] set to default: eth0):
```

##### 4.1.3.5. Specify customer name

The Wireguard VPN server cannot start until you add at least one client. Enter a VPN username.
In my case, I entered Alex@mobil name.

```sh
Enter VPN user name: Alex@mobile
```

After that, you should receive a QR code of an added client configuration. This QR applies the user config to Wireguard mobile client on Android or iOS.
The text of the configuration file is also displayed with QR. You will need in case of manual configuration of clients as discussed below.

![Completing the Wireguard installation](~attachments/wireguard-aws/en/install1.jpg)

### 4.2. Add new VPN user

To add a new user, you need to run the script `add-client.sh` in the terminal

```sh
sudo ./add-client.sh
```

The script asks for the username:

```sh
Enter VPN user name:
```

The username can go along as a script parameter (in my case, the username is Alex@mobile):

```sh
sudo ./add-client.sh Alex@mobile
```

The execution of the script leads to the creation of the client config file in the client directory.
Client config file: `/etc/wireguard/clients/{ClientName}/{ClientName}.conf`.
Client directory: `/etc/wireguard/clients/{ClientName}`

#### 4.2.1. User configuration file

Execute the cat command to get the contents of the `.conf` file for client manual configuration.

```sh
sudo cat/etc/wireguard/clients/Alex@mobile/Alex@mobile.conf
```

the result of command execution as follows:

```ini
[Interface]
PrivateKey = oDMWr0toPVCvgKt5oncLLRfHRit + jbzT5cshNUi8zlM =
Address = 10.50.0.2/32
DNS = 1.1.1.1

[Peer]
PublicKey = mLnd + mul15U0EP6jCH5MRhIAjsfKYuIU / j5ml8Z2SEk =
PresharedKey = wjXdcf8CG29Scmnl5D97N46PhVn1jecioaXjdvrEkAc =
AllowedIPs = 0.0.0.0/0, :: / 0
Endpoint = 4.3.2.1:54321
```

description of client configuration file:

```ini
[Interface]
PrivateKey = Client's private key
Address = Client IP Address
DNS = DNS used by the client

[Peer]
PublicKey = Public key server
PresharedKey = Shared server and client key
AllowedIPs = Allowed addresses for connection (all - 0.0.0.0/0, :: / 0)
Endpoint = IP address and port for connection
```

#### 4.2.2. Client configuration with QR code

Execute the `qrencode -t ansiutf8` command to get the QR of a created client config. (in my case, the new client name is Alex@mobile).

```sh
sudo cat /etc/wireguard/clients/Alex@mobile/Alex@mobile.conf | qrencode -t ansiutf8
```

## 5. Configure VPN Clients

### 5.1. Android mobile Client setup

Download the Wireguard mobile client for Android from the [official GooglePlay store](https://play.google.com/store/apps/details?id=com.wireguard.android).

Scan the QR code to import the client configuration (see [4.2.2]) and assign it a name.

![Android mobile Client setup](~attachments/wireguard-aws/en/android1.jpg)

After importing the configuration, you can enable the VPN tunnel. A little key symbol in the Android system confirms the VPN connection.

![Successfully established Wireguard connection on Android](~attachments/wireguard-aws/en/android2.jpg)

### 5.2. Windows Client Setup

Download and install the [TunSafe](https://tunsafe.com/download), which is a Wireguard client for Windows.

### 5.2.1. Create a local text file to import configuration

Create a dummy text file on the desktop of your PC.

![Creating a text file](~attachments/wireguard-aws/en/windows1.jpg)

#### 5.2.2. Copy the configuration file from the server

Copy the contents of the configuration file from the server.
Then, go back to the Putty terminal and display the contents of the user configuration file (see [4.2.1]).
Use right-click of the mouse to copy the configuration text in the Putty terminal.

![Copying text with configuration](~attachments/wireguard-aws/en/windows2.jpg)

#### 5.2.3. Paste the configuration text to a local text file

Paste the configuration text from the clipboard to dummy text file we created earlier on the desktop (see [5.2.1]).

![Paste text with configuration](~attachments/wireguard-aws/en/windows3.jpg)

#### 5.2.4. Save the local configuration file

Save the text file as the **.conf** format (in my case as `london.conf`)

![Save the local configuration file](~attachments/wireguard-aws/en/windows4.jpg)

#### 5.2.5. Import local configuration file

Import the configuration file into the TunSafe program.

![Import local configuration file into TunSafe](~attachments/wireguard-aws/en/windows5.jpg)

#### 5.2.6. Establish a VPN connection

In TunSafe program select the imported configuration file and click the **Connect** button.

![Establish a VPN connection](~attachments/wireguard-aws/en/windows6.jpg)

## 6. Verify VPN connection

Use [https://2ip.ua/en/](https://2ip.ua/en/) resource to verify the VPN tunnel connection. If the displayed IP address matches the one we got in [2.2.3], so the VPN tunnel is up and running.

![Connecting to a VPN server through TunSafe](~attachments/wireguard-aws/en/check1.jpg)

In a Linux terminal, you can check your IP address by executing the following command:

```sh
curl http://zx2c4.com/ip
```
