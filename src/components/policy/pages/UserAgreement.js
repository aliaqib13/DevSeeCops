import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

const UserAgreement = () => (
    <div className="general_user_agreement_container">
        <Title level={2} className="main-title">
            User Agreement DevSecOps Academy
        </Title>
        <Typography>
            <div className="policy-card">
                <div className="content">
                    <Title level={4}>
                        1.1 Contract
                    </Title>
                    <Paragraph>
                        You agree that by clicking “Register”,
                        “Join DevSecOps Academy”, “Sign Up” or similar,
                        registering, accessing or using our services
                        (described below),
                        {' '}
                        <Text strong>
                            {' '}
                            you are agreeing to enter
                            into a legally binding contract
                        </Text>
                        {' '}
                        with DevSecOps
                        Academy (even if you are using our Services on behalf of a company).
                        If you do not agree to this contract (“Contract” or “User Agreement”),
                        do
                        {' '}
                        <Text strong> not</Text>
                        {' '}
                        click “Register” (or similar) and do not access or otherwise use any
                        of our Services.
                        If you wish to terminate this contract, at any time you can do so by closing your account and
                        no longer accessing or using our Services.
                    </Paragraph>
                    <Title level={3}>Services</Title>
                    <Paragraph>
                        This Contract applies to
                        {' '}
                        <Text strong>devsecops-academy.com</Text>
                        {' '}
                        and
                        {' '}
                        <Text strong>app.devsecops-academy.com</Text>
                        {' '}
                        including the offsite collection of data for those Services,
                        such as our ads and other plugins.
                        Registered users of our Services are “Members” and unregistered users are “Visitors”.
                    </Paragraph>
                    <Paragraph>
                        As a Visitor or Member of our Services,
                        the collection, use and sharing of your personal data is subject to our Privacy Policy
                        (which includes our Cookie Policy and other documents referenced in this Privacy Policy) and updates.
                    </Paragraph>
                    <Title level={3}>DevSecOps Academy</Title>
                    <Paragraph>
                        You are entering into this Contract with DevSecOps Academy (also referred to as “we” and “us”).
                    </Paragraph>
                </div>
                <Title level={4}> 1.2 Members and Visitors</Title>
                <Paragraph>
                    When you register and join DevSecOps Academy Service you become a Member.
                    If you have chosen not to register for our Services,
                    you may access certain features as a “Visitor.”
                </Paragraph>
                <Title level={4}>
                    1.3 Change
                </Title>
                <Paragraph>
                    We may modify this Contract, our Privacy Policy and our Cookies Policy from time to time.
                    If we make material changes to it, we will provide you notice through our Services, or by other
                    means,
                    to provide you the opportunity to review the changes before they become effective.
                    We agree that changes cannot be retroactive.
                    If you object to any changes, you may close your
                    account. Your continued use of our
                    Services after we publish or send a notice about our changes to these terms means
                    that you are consenting to the updated terms as of their effective date.
                </Paragraph>

            </div>
            <div className="policy-card">
                <Title level={3}>
                    2. Obligations
                </Title>
                <Title level={4}>
                    2.1 Service Eligibility
                </Title>
                <Paragraph className='asdf'>
                    The Services are not for use by anyone under the age of 16.
                </Paragraph>
                <Paragraph>
                    To use the Services, you agree that:
                    (1) you must be the “Minimum Age” (described below) or older;
                    (2) you will only have one DevSecOps Academy account, which must be in your real name; and
                    (3) you are not already restricted by DevSecOps Academy from using the Services.
                    Creating an account with false information is a violation of our terms, including
                    accounts registered on behalf of others or persons under the age of 16.
                    “Minimum Age” means 16 years old. However, if law requires that you must be older in order for
                    DevSecOps Academy to lawfully provide the Services to you without parental consent (including using
                    of your personal data) then the Minimum Age is such older age.
                </Paragraph>
                <Title level={4}>
                    2.2 Your Account
                </Title>
                <Paragraph>
                    Members are account holders. You agree to use a strong password and keep it confidential.
                    You are responsible for anything that happens through your account unless you close it or report
                    misuse.
                    As between you and others (including your employer), your account belongs to you. However,
                    if the Services were purchased by another party for you to use (e.g. an enterprise contract
                    for a number of labs acquired by your employer), the party paying for such Service has the right to
                    control access
                    to and get reports on your use of such paid Service; however, they do not have rights to your
                    personal account.
                </Paragraph>
                <Title level={4}>
                    2.3 Payment
                </Title>
                <Paragraph>
                    If you buy any of our paid Services
                    (e.g. a specific paid training module) you agree to pay us the applicable
                    fees and taxes and to additional
                    terms
                    specific to the paid Services.
                    Failure to pay these fees will result in the termination of your paid Services. Also, you agree
                    that:
                    <ul>
                        <li>
                            Your purchase may be subject to foreign exchange fees or differences in prices based on
                            location (e.g. exchange rates).
                        </li>
                        <li>
                            We may store and continue billing your payment method (e.g. credit card) even after it has
                            expired,
                            to avoid interruptions in your Services and to use to pay other Services you may buy.
                        </li>
                        <li>
                            If you purchase a subscription, your payment method automatically
                            will be charged at the start of each subscription period for the fees and
                            taxes applicable to that period. To avoid future charges, cancel before the renewal date.
                        </li>
                        <li>
                            All of your purchases of Services are subject to DevSecOps Academy
                            refund
                            policy.
                        </li>
                        <li>
                            We may calculate taxes payable by you based on the billing information that you provide us
                            at the time of purchase.
                        </li>
                    </ul>
                </Paragraph>
                <Paragraph>
                    You can get a copy of your purchases through your DevSecOps Academy account settings.
                </Paragraph>
                <Title level={4}>2.4 Notices and Messages</Title>
                <Paragraph>
                    You agree that we will provide notices and messages to you in the following ways:
                    (1) within the Service,
                    or (2) sent to the contact information you provided us (e.g., email).
                    You agree to keep yourcontact
                    information
                    up to date.
                </Paragraph>
                <Title level={4}>2.5 Sharing </Title>
                <Paragraph>
                    Our Services allow messaging and sharing of information in many ways, such as your certificates.
                    Information and content that you share or post may be seen by other Members,
                    Visitors or others (including off of the Services).
                    Where we have made settings available, we will honor the choices you make about who can see content
                    or information.
                </Paragraph>
                <Paragraph>
                    We are not obligated to publish any information or content on our Service and can remove it with or
                    without notice.
                </Paragraph>
                <Title level={4}>2.6 Certificate verification & validation </Title>
                <Paragraph>
                    Our Services allow other Members, Visitors or others (including off of the Services) to check the validity of a certificate that
                    has been issued by the DevSecOps Academy. Upon entering a certificate ID the following information will be displayed: first name, last name,
                    course name, course level, course version, dates and signatures. You hereby consent that this information will be publicly displayed when a person
                    knows the certificate ID.
                    Where we have made settings available, we will honor the choices you make about who can see content
                    or information.
                </Paragraph>
            </div>

            <div className="policy-card">
                <Title level={3}> 3. Rights and Limits</Title>
                <Title level={4}>3.1. Your License to DevSecOps Academy </Title>
                <Paragraph>
                    As between you and DevSecOps Academy,
                    you own the content and information that you submit or post to the Services, and you are only
                    granting
                    DevSecOps Academy the following non-exclusive license:
                    A worldwide, transferable and sublicensable right to use, copy, modify, distribute, publish and
                    process,
                    information and content that you provide through our Services and the services of others, without
                    any further consent,
                    notice and/or compensation to you or others. These rights are limited in the following ways:
                </Paragraph>
                <Paragraph>
                    <ol>
                        <li>
                            You can end this license for specific content by deleting such content from the Services,
                            or generally by closing your account, except (a) to the extent you shared it with others as
                            part of the
                            Service and they copied, re-shared it or stored it and (b) for the reasonable time it takes
                            to remove from backup and other systems.
                        </li>
                        <li>
                            We will not include your content in advertisements for the products
                            and services of third parties to others without your separate consent
                            (including sponsored content). However, we have the right, without payment to you or others,
                            to serve ads near your content and information, and your social actions may be visible and
                            included with ads,
                            as noted in the Privacy Policy. If you use a Service feature, we may mention that with your
                            name or photo to
                            promote that feature within our Services, subject to your settings.
                        </li>
                        <li>
                            We will get your consent if we want to give others the right to publish your content beyond
                            the Services.
                        </li>
                        <li>
                            While we may edit and make format changes to your content (such as translating or
                            transcribing it,
                            modifying the size, layout or file type or removing metadata), we will not modify the
                            meaning of your expression.
                        </li>
                    </ol>
                </Paragraph>
                <Paragraph>
                    You and DevSecOps Academy agree that we may access, store,
                    process and use any information and personal data that you provide in accordance with,
                    the terms of the Privacy Policy and
                    your choices (including settings).
                </Paragraph>
                <Paragraph>
                    By submitting suggestions or other feedback regarding our Services to DevSecOps Academy,
                    you agree that DevSecOps Academy can use and share (but does not have to) such feedback for any
                    purpose without compensation to you.
                </Paragraph>
                <Title level={4}>3.2 Service Availability</Title>
                <Paragraph>
                    We may change, suspend or discontinue any of our Services.
                    We may also modify our prices effective prospectively upon reasonable notice to the extent allowed
                    under the law.
                </Paragraph>
                <Paragraph>
                    We don’t promise to store or keep showing any information and content that you’ve created.
                    DevSecOps Academy is not a storage service. You agree that we have no obligation to store,
                    maintain or provide you a copy of any content or information that you or others provide,
                    except to the extent required by applicable law and as noted in our Privacy Policy.
                </Paragraph>
                <Title level={4}>3.3 Other Content, Sites and Apps</Title>
                <Paragraph>
                    By using the Services, you may encounter content or information that might be inaccurate,
                    incomplete, delayed, misleading, illegal, offensive or otherwise harmful.
                    DevSecOps Academy generally does not review content provided by our Members or others.
                    You agree that we are not responsible for others’ (including other Members’) content or information.
                    We cannot always prevent this misuse of our Services, and you agree that we are not responsible for
                    any such misuse.
                    such events
                </Paragraph>
                <Title level={4}>3.4 Limits</Title>
                <Paragraph>
                    DevSecOps Academy reserves the right to limit your use of the Services, including the number of your
                    connections and your ability to contact other Members.
                    DevSecOps Academy reserves the right to restrict, suspend, or terminate your account if you breach
                    this Contract or the law or are misusing the Services.
                </Paragraph>
                <Title level={4}>3.5 Intellectual Property Rights</Title>
                <Paragraph>
                    DevSecOps Academy reserves all of its intellectual property rights in the Services.
                    Trademarks and logos used in connection with the Services are the trademarks of their respective
                    owners.
                    DevSecOps Academy, and “in” logos and other DevSecOps Academy trademarks, service marks,
                    graphics and logos used for our Services are trademarks or registered trademarks of DevSecOps
                    Academy.
                </Paragraph>
            </div>

            <div className="policy-card">
                <Title level={3}>4. Disclaimer and Limit of Liability</Title>
                <Title level={4}>4.1 No Warranty</Title>
                <Paragraph>
                    DevSecOps Academy MAKE NO REPRESENTATION OR WARRANTY ABOUT THE SERVICES, INCLUDING ANY
                    REPRESENTATION THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, AND PROVIDE THE SERVICES
                    (INCLUDING CONTENT AND INFORMATION) ON AN “AS IS” AND “AS AVAILABLE” BASIS. TO THE FULLEST EXTENT
                    PERMITTED UNDER APPLICABLE LAW, DevSecOps Academy AND ITS AFFILIATES DISCLAIM ANY IMPLIED OR
                    STATUTORY WARRANTY, INCLUDING ANY IMPLIED WARRANTY OF TITLE, ACCURACY OF DATA, NON-INFRINGEMENT,
                    MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
                </Paragraph>
                <Paragraph>
                    TO THE FULLEST EXTENT PERMITTED BY LAW (AND UNLESS DevSecOps Academy HAS ENTERED INTO A SEPARATE
                    WRITTEN AGREEMENT THAT OVERRIDES THIS CONTRACT), DevSecOps Academy, INCLUDING ITS AFFILIATES, WILL
                    NOT BE LIABLE IN CONNECTION WITH THIS CONTRACT FOR LOST PROFITS OR LOST BUSINESS OPPORTUNITIES,
                    REPUTATION (E.G., OFFENSIVE OR DEFAMATORY STATEMENTS), LOSS OF DATA (E.G., DOWN TIME OR LOSS, USE
                    OF, OR CHANGES TO, YOUR INFORMATION OR CONTENT) OR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL
                    OR PUNITIVE DAMAGES.
                </Paragraph>
                <Paragraph>
                    DevSecOps Academy AND ITS AFFILIATES WILL NOT BE LIABLE TO YOU IN CONNECTION WITH THIS CONTRACT FOR
                    ANY AMOUNT THAT EXCEEDS (A) THE TOTAL FEES PAID OR PAYABLE BY YOU TO DevSecOps Academy FOR THE
                    SERVICES DURING THE TERM OF THIS CONTRACT, IF ANY, OR (B) US $1000.
                </Paragraph>
                <Title level={4}>4.3 Basis of the Bargain; Exclusions</Title>
                <Paragraph>
                    The limitations of liability in this Section 4 are part of the basis of the bargain between you and
                    DevSecOps Academy and shall apply to all claims of liability (e.g., warranty, tort, negligence,
                    contract and law) even if DevSecOps Academy or its affiliates has been told of the possibility of
                    any such damage, and even if these remedies fail their essential purpose.
                </Paragraph>
                <Paragraph>
                    These limitations of liability do not apply to liability for death or personal injury or for fraud,
                    gross negligence or intentional misconduct, or in cases of negligence where a material obligation
                    has been breached, a material obligation being such which forms a prerequisite to our delivery of
                    services and on which you may reasonably rely, but only to the extent that the damages were directly
                    caused by the breach and were foreseeable upon conclusion of this Contract and to the extent that
                    they are typical in the context of this Contract.
                </Paragraph>
            </div>

            <div className="policy-card">
                <Title level={3}>5. Termination</Title>
                <Paragraph>
                    Both you and DevSecOps Academy may terminate this Contract at any time with notice to the other. On
                    termination, you lose the right to access or use the Services. The following shall survive
                    termination:
                </Paragraph>
                <Paragraph>
                    <ul>
                        <li>
                            Our rights to use and disclose your feedback;
                        </li>
                        <li>
                            Members and/or Visitors’ rights to further re-share content and information you shared
                            through the Services;
                        </li>
                        <li>
                            Sections 4, 6, 7, and 8.2 of this Contract;
                        </li>
                        <li>
                            Any amounts owed by either party prior to termination remain owed after termination.
                        </li>
                    </ul>
                    You can contact us via any channel to close your account.
                </Paragraph>
            </div>

            <div className="policy-card">
                <Title level={3}>6. Governing Law and Dispute Resolution</Title>
                <Paragraph>
                    This section shall not deprive you of any mandatory consumer protections under the law of the
                    country to which we direct Services to you, where you have your habitual residence.
                </Paragraph>
            </div>

            <div className="policy-card">
                <Title level={3}>7. General Terms</Title>
                <Paragraph className="asdf">
                    if a court with authority over this Contract finds any part of it unenforceable, you and we agree
                    that the court should modify the terms to make that part enforceable while still achieving its
                    intent. If the court cannot do that, you and we agree to ask the court to remove that unenforceable
                    part and still enforce the rest of this Contract.
                </Paragraph>
                <Paragraph>
                    This Contract (including additional terms that may be provided by us when you engage with a feature
                    of the Services) is the only agreement between us regarding the Services and supersedes all prior
                    agreements for the Services.
                </Paragraph>
                <Paragraph>
                    If we don't act to enforce a breach of this Contract, that does not mean that DevSecOps Academy has
                    waived its right to enforce this Contract. You may not assign or transfer this Contract (or your
                    membership or use of Services) to anyone without our consent. However, you agree that DevSecOps
                    Academy may assign this Contract to its affiliates or a party that buys it without your consent.
                    There are no third-party beneficiaries to this Contract.
                </Paragraph>
                <Paragraph>
                    You agree that the only way to provide us legal notice is at the addresses provided in Section 10.
                </Paragraph>
            </div>

            <div className="policy-card">
                <Title level={3}>8. DevSecOps Academy “Dos and Don’ts”</Title>
                <Title level={4}>You agree that you will:</Title>
                <Paragraph>
                    <ol>
                        <li className='alpha-li'>
                            Comply with all applicable laws, including, without limitation, privacy laws,
                            intellectual property laws, anti-spam laws, export control laws, tax laws, and regulatory requirements;
                        </li>
                        <li className='alpha-li'>Provide accurate information to us and keep it updated;</li>
                        <li className='alpha-li'>Use your real name on your profile; and</li>
                        <li className='alpha-li'>Use the Services in a professional manner.</li>
                    </ol>
                </Paragraph>
                <Title level={4}>8.2. Don’ts</Title>
                <Title level={4}>You agree that you will not:</Title>
                <Paragraph>
                    <ol>
                        <li className='alpha-li'>
                            Create a false identity on DevSecOps Academy,
                            misrepresent your identity, create a
                            Member profile for anyone other than yourself (a real person), or use or attempt to use
                            another’s account;
                        </li>
                        <li className='alpha-li'>
                            Develop, support or use software, devices, scripts,
                            robots or any other means or processes (including crawlers, browser plugins and add-ons or
                            any other technology) to scrape the Services or otherwise copy profiles and other data from
                            the Services;
                        </li>
                        <li className='alpha-li'>
                            Override any security feature or bypass or circumvent
                            any access controls or use limits of the Service (
                        </li>
                        <li className='alpha-li'>
                            Copy, use, disclose or distribute any information
                            obtained from the Services, whether directly or through third parties (such as search
                            engines), without the consent of DevSecOps Academy;
                        </li>
                        <li className='alpha-li'>
                            Disclose information that you do not have the consent
                            to disclose (such as confidential information of others (including your employer));
                        </li>
                        <li className='alpha-li'>
                            Violate the intellectual property rights of others, including copyrights, patents,
                            trademarks, trade secrets or other proprietary rights. For example, do not copy or
                            distribute (except through the available sharing functionality) the posts or other content
                            of others without their permission, which they may give by posting under a Creative Commons
                            license;
                        </li>
                        <li className='alpha-li'>
                            Violate the intellectual property or other rights of DevSecOps Academy, including, without
                            limitation, (i) copying or distributing our learning videos or other materials or (ii)
                            copying or distributing our technology, unless it is released under open source licenses;
                            (iii) using the word “DevSecOps Academy” or our logos in any business name, email, or URL
                        </li>
                        <li className='alpha-li'>
                            Post anything that contains software viruses, worms, or any other harmful code;
                        </li>
                        <li className='alpha-li'>
                            Reverse engineer, decompile, disassemble, decipher or otherwise attempt to derive the source
                            code for the Services or any related technology that is not open source;
                        </li>
                        <li className='alpha-li'>
                            Imply or state that you are affiliated with or endorsed by DevSecOps Academy without our
                            express consent
                            (e.g., representing yourself as an accredited DevSecOps Academy trainer);
                        </li>
                        <li className='alpha-li'>
                            Rent, lease, loan, trade, sell/re-sell or otherwise monetize the Services or related data or
                            access to the same, without DevSecOps Academy’s consent;
                        </li>
                        <li className='alpha-li'>
                            Deep-link to our Services for any purpose other than to promote your profile or a Group on
                            our Services, without DevSecOps Academy’s consent;
                        </li>
                        <li className='alpha-li'>
                            Use bots or other automated methods to access the Services, add or download contacts, send
                            or redirect messages;
                        </li>
                        <li className='alpha-li'>
                            Monitor the Services’ availability, performance or functionality for any competitive
                            purpose;
                        </li>
                        <li className='alpha-li'>
                            Engage in “framing,” “mirroring,” or otherwise simulating the appearance or function of the
                            Services;
                        </li>
                        <li className='alpha-li'>
                            Overlay or otherwise modify the Services or their appearance (such as by inserting elements
                            into the Services or removing, covering, or obscuring an advertisement included on the
                            Services);
                        </li>
                        <li className='alpha-li'>
                            Interfere with the operation of, or place an unreasonable load on, the Services (e.g., spam,
                            denial of service attack, viruses, gaming algorithms); and/or
                        </li>
                    </ol>
                </Paragraph>
            </div>

            <div className="policy-card">
                <Title level={3}>9. Complaints Regarding Content</Title>
                <Paragraph>
                    We respect the intellectual property rights of others. We require that information posted by Members
                    be accurate and not in violation of the intellectual property rights or other rights of third
                    parties. We provide a policy and process for complaints concerning content posted by our Members
                </Paragraph>
            </div>

            <div className="policy-card">
                <Title level={3}>10. How To Contact Us</Title>
                <Paragraph>
                    For general inquiries, you may contact us
                    via info[at]devsecops-academy.com.
                    For legal notices or service of process, you may write us at our
                    addresses that can be obtained by contacting us.
                </Paragraph>
            </div>
        </Typography>
    </div>
);

export default UserAgreement;
