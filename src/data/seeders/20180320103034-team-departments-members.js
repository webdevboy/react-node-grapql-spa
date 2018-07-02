import path from 'path';
import Promise from 'bluebird';
import {
  // TeamDepartment,
  // TeamMember,
  // TeamDepartmentTranslation,
  // TeamMemberTranslation,
  Language,
  Post,
  Term,
  TermTaxonomy,
  User,
} from '../models';
import slugify from '../../core/generateSlug';

const filename = path.basename(__filename);
const DESCRIPTION = `Auto generated by seed name: ${filename}`;
const DEPTS = ['Management', 'Sales', 'Development', 'Technology & Marketing', 'Support'];

export default {
  up: async () => {

    // author ====
    const author = await User.findOne();
    // languages ====
    const en = await Language.findOne({ where: { locale: 'en', enabled: true } });
    const fr = await Language.findOne({ where: { locale: 'fr', enabled: true } });
    const de = await Language.findOne({ where: { locale: 'de', enabled: true } });

    // term management
    await Promise.each(DEPTS, async (dept, index) => {
      const term = await Term.create({
        name: dept,
        language_id: en.id,
        meta: {
          order: index
        }
      });
      await TermTaxonomy.create({
        term_id: term.id,
        taxonomy: 'team_department',
      });
    });
    const it = await TermTaxonomy.findOne({
      where: { taxonomy: 'team_department', },
      include: {
        model: Term,
        as: 'term',
        where: {
          slug: 'it',
          language_id: en.id,
        }
      }
    });
    const management = await TermTaxonomy.findOne({
      where: { taxonomy: 'team_department', },
      include: {
        model: Term,
        as: 'term',
        where: {
          slug: 'management',
          language_id: en.id,
        }
      }
    });
    const sales = await TermTaxonomy.findOne({
      where: { taxonomy: 'team_department', },
      include: {
        model: Term,
        as: 'term',
        where: {
          slug: 'sales',
          language_id: en.id,
        }
      }
    });
    const development = await TermTaxonomy.findOne({
      where: { taxonomy: 'team_department', },
      include: {
        model: Term,
        as: 'term',
        where: {
          slug: 'development',
          language_id: en.id,
        }
      }
    });
    const tech_and_marketing = await TermTaxonomy.findOne({
      where: { taxonomy: 'team_department', },
      include: {
        model: Term,
        as: 'term',
        where: {
          slug: slugify('Technology & Marketing'),
          language_id: en.id,
        }
      }
    });
    const support = await TermTaxonomy.findOne({
      where: { taxonomy: 'team_department', },
      include: {
        model: Term,
        as: 'term',
        where: {
          slug: slugify('Support'),
          language_id: en.id,
        }
      }
    });

   
//--------------- MANAGEMENT TEAM 
    

    const eymeric = await Post.create({
      title: 'CEO and Founder',
      post_id: '100000',
      meta: {
        first_name: 'Eymeric',
        last_name: 'Segard',
        email: 'esegard@lunajets.com',
        /*bio: 'This is the description bio for a Management team member. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s ...',*/
        visible: true,
        flags: ['gb', 'es', 'fr', 'it', 'br'],
        order: {
          [management.term]: 1
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/management/eymeric.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await eymeric.addTaxonomies([management]); // add to member

    const alain = await Post.create({
      title: 'Sales and Business Development Director',
      post_id: '100001',
      meta: {
        first_name: 'Alain',
        last_name: 'Leboursier',
        email: 'alain@lunajets.com',
        /*bio: 'This is the description bio for a Management team member. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s ...',*/
        visible: true,
        flags: ['gb', 'fr'],
        order: {
          [management.term]:2,
          [sales.term]:1,
          [development.term]:1
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/management/alain.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await alain.addTaxonomies([management,sales,development]); // add to member


    const jose = await Post.create({
      title: 'Head of IT and Operations',
      post_id: '100002',
      meta: {
        first_name: 'Jose',
        last_name: 'Ferreiro',
        email: 'jose@lunajets.com',
        /*bio: 'This is the description bio for a Management team member. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s ...',*/
        visible: true,
        flags: ['es', 'gb', 'fr', 'pt'],
        order: {
          [tech_and_marketing.term]: 1,
          [management.term]:3
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/management/jose.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await jose.addTaxonomies([tech_and_marketing, management]); // add to member


//--------------- END MANAGEMENT TEAM 


//--------------- SALES TEAM 


    const marina = await Post.create({
      title: 'Senior Sales Manager',
      post_id: '100002',
      meta: {
        first_name: 'Marina',
        last_name: 'Rosa',
        email: 'marina@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr', 'it'],
        order: {
          [sales.term]:2
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/marina.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await marina.addTaxonomies([sales]); // add to member


    const sebastian = await Post.create({
      title: 'Sales Manager',
      post_id: '100003',
      meta: {
        first_name: 'Sebastian',
        last_name: 'Brender',
        email: 'sebastian@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'de', 'fr'],
        order: {
          [sales.term]:3
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/sebastian.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await sebastian.addTaxonomies([sales]); // add to member


    const marc = await Post.create({
      title: 'Private Aviation Advisor',
      post_id: '100004',
      meta: {
        first_name: 'Marc',
        last_name: 'Gasser',
        email: 'marc@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr'],
        order: {
          [sales.term]:4
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/marc.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await marc.addTaxonomies([sales]); // add to member


    const felicia = await Post.create({
      title: 'Private Aviation Advisor',
      post_id: '100005',
      meta: {
        first_name: 'Felicia',
        last_name: 'Babaca',
        email: 'felicia@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'de', 'ro'],
        order: {
          [sales.term]:5
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/felicia.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await felicia.addTaxonomies([sales]); // add to member


    const guillaume = await Post.create({
      title: 'Private Aviation Advisor',
      post_id: '100006',
      meta: {
        first_name: 'Guillaume',
        last_name: 'Launay',
        email: 'guillaume@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr', 'es'],
        order: {
          [sales.term]:6
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/guillaume.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await guillaume.addTaxonomies([sales]); // add to member


    const alessandro = await Post.create({
      title: 'Private Aviation Advisor',
      post_id: '100007',
      meta: {
        first_name: 'Alessandro',
        last_name: 'Rosa',
        email: 'alessandro@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr', 'it', 'es'],
        order: {
          [sales.term]:7
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/alessandro.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await alessandro.addTaxonomies([sales]); // add to member


    const petr = await Post.create({
      title: 'Private Aviation Advisor',
      post_id: '100008',
      meta: {
        first_name: 'Petr',
        last_name: 'Balabin',
        email: 'petr@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'ru'],
        order: {
          [sales.term]:8
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/petr.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await petr.addTaxonomies([sales]); // add to member


    const chari = await Post.create({
      title: 'Private Aviation Advisor',
      post_id: '100009',
      meta: {
        first_name: 'Chari',
        last_name: 'Papadatou',
        email: 'chari@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr', 'gr'],
        order: {
          [sales.term]:9
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/chari.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await chari.addTaxonomies([sales]); // add to member


    const marco = await Post.create({
      title: 'Private Aviation Advisor',
      post_id: '100010',
      meta: {
        first_name: 'Marco',
        last_name: 'Vitali',
        email: 'marco@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr', 'it', 'es'],
        order: {
          [sales.term]:10
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/marco.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await marco.addTaxonomies([sales]); // add to member


    const julia = await Post.create({
      title: 'Private Aviation Advisor',
      post_id: '100011',
      meta: {
        first_name: 'Julia',
        last_name: 'Amadio',
        email: 'julia@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr', 'br'],
        order: {
          [sales.term]:11
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/julia.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await julia.addTaxonomies([sales]); // add to member


    const merwan = await Post.create({
      title: 'Private Aviation Advisor',
      post_id: '100012',
      meta: {
        first_name: 'Merwan',
        last_name: 'Boufous',
        email: 'merwan@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr', 'es'],
        order: {
          [sales.term]:12
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/merwan.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await merwan.addTaxonomies([sales]); // add to member


    const eriks = await Post.create({
      title: 'Private Aviation Advisor',
      post_id: '100013',
      meta: {
        first_name: 'Eriks',
        last_name: 'Ziverts',
        email: 'eriks@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'ru', 'lv'],
        order: {
          [sales.term]:13
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/eriks.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await eriks.addTaxonomies([sales]); // add to member


    const mihai = await Post.create({
      title: 'Private Aviation Advisor',
      post_id: '100014',
      meta: {
        first_name: 'Mihai',
        last_name: 'Michel',
        email: 'mihai@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr', 'ro', 'es'],
        order: {
          [sales.term]:14
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/mihai.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await mihai.addTaxonomies([sales]); // add to member


    const alban = await Post.create({
      title: 'Private Aviation Advisor',
      post_id: '100015',
      meta: {
        first_name: 'Alban',
        last_name: 'Serin',
        email: 'alban@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr'],
        order: {
          [sales.term]:15
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/alban.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await alban.addTaxonomies([sales]); // add to member


    const sofia = await Post.create({
      title: 'Private Aviation Coordinator',
      post_id: '100016',
      meta: {
        first_name: 'Sofia',
        last_name: 'Aleksashina',
        email: 'sofia@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'ru'],
        order: {
          [sales.term]:16
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/sofia.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await sofia.addTaxonomies([sales]); // add to member


    const lina = await Post.create({
      title: 'Private Aviation Coordinator',
      post_id: '100017',
      meta: {
        first_name: 'Lina',
        last_name: 'Koschull',
        email: 'lina@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'de'],
        order: {
          [sales.term]:17
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/lina.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await lina.addTaxonomies([sales]); // add to member


    const aleksandra = await Post.create({
      title: 'Private Aviation Coordinator',
      post_id: '100018',
      meta: {
        first_name: 'Aleksandra',
        last_name: 'Barresi Varga',
        email: 'aleksandra@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'de', 'it', 'es', 'hr', 'sr'],
        order: {
          [sales.term]:18
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/aleksandra.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await aleksandra.addTaxonomies([sales]); // add to member


    const boris = await Post.create({
      title: 'Private Aviation Coordinator',
      post_id: '100019',
      meta: {
        first_name: 'Boris',
        last_name: 'Jandric',
        email: 'boris@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'it', 'hr', 'sr'],
        order: {
          [sales.term]:19
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/boris.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await boris.addTaxonomies([sales]); // add to member


    const arthur = await Post.create({
      title: 'Private Aviation Coordinator',
      post_id: '100020',
      meta: {
        first_name: 'Arthur',
        last_name: 'Guibert',
        email: 'arthur@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr'],
        order: {
          [sales.term]:20
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/arthur.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await arthur.addTaxonomies([sales]); // add to member


    const emily = await Post.create({
      title: 'Private Aviation Coordinator',
      post_id: '100021',
      meta: {
        first_name: 'Emily',
        last_name: 'Amez-Droz',
        email: 'emily@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr'],
        order: {
          [sales.term]:21
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/emily.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await emily.addTaxonomies([sales]); // add to member


    const naser = await Post.create({
      title: 'Private Aviation Coordinator',
      post_id: '100022',
      meta: {
        first_name: 'Naser',
        last_name: 'Kalantari',
        email: 'naser@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr', 'ir', 'tr'],
        order: {
          [sales.term]:22
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/naser.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await naser.addTaxonomies([sales]); // add to member


    const stanislav = await Post.create({
      title: 'Private Aviation Coordinator',
      post_id: '100023',
      meta: {
        first_name: 'Stanislav',
        last_name: 'Muravyev',
        email: 'stanislav@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr', 'ru'],
        order: {
          [sales.term]:23
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/stan.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await stanislav.addTaxonomies([sales]); // add to member


    const anatole = await Post.create({
      title: 'Private Aviation Coordinator',
      post_id: '100024',
      meta: {
        first_name: 'Anatole',
        last_name: 'Chappuis',
        email: 'anatole@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr'],
        order: {
          [sales.term]:24
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/anatole.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await anatole.addTaxonomies([sales]); // add to member


    const mickael = await Post.create({
      title: 'Private Aviation Coordinator',
      post_id: '100025',
      meta: {
        first_name: 'Mickaël',
        last_name: 'Gautier',
        email: 'mickael@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr'],
        order: {
          [sales.term]:25
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/sales/mickael.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await mickael.addTaxonomies([sales]); // add to member


//--------------- END SALES TEAM 


//--------------- DEVELOPMENT TEAM 


    const dhruv = await Post.create({
      title: 'Senior Business Development Executive',
      post_id: '100028',
      meta: {
        first_name: 'Dhruv',
        last_name: 'Fornerod',
        email: 'dhruv@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr'],
        order: {
          [development.term]:2
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/development/dhruv.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await dhruv.addTaxonomies([development]); // add to member


    const laszlo = await Post.create({
      title: 'Business Development Hungary',
      post_id: '100029',
      meta: {
        first_name: 'Laszlo',
        last_name: 'Pal',
        email: 'lpal@airconnect.hu',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'hu'],
        order: {
          [development.term]:3
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/development/laszlo.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await laszlo.addTaxonomies([development]); // add to member


    const sergio = await Post.create({
      title: 'Business Development Italy - Olbia',
      post_id: '100030',
      meta: {
        first_name: 'Sergio',
        last_name: 'Rosa',
        email: 'sergio@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr', 'es', 'it'],
        order: {
          [development.term]:4
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/development/sergio.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await sergio.addTaxonomies([development]); // add to member


    const pietro = await Post.create({
      title: 'Business Development Ibiza',
      post_id: '100031',
      meta: {
        first_name: 'Pietro',
        last_name: 'Davide',
        email: 'pietro@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'es', 'it'],
        order: {
          [development.term]:5
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/development/pietro.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await pietro.addTaxonomies([development]); // add to member


    const przemyslaw = await Post.create({
      title: 'Business Development Poland',
      post_id: '100032',
      meta: {
        first_name: 'Przemyslaw',
        last_name: 'Szpak',
        email: 'przemyslaw@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'pl'],
        order: {
          [development.term]:6
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/development/przemyslaw.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await przemyslaw.addTaxonomies([development]); // add to member


    const marcin = await Post.create({
      title: 'Business Development Poland',
      post_id: '100033',
      meta: {
        first_name: 'marcin',
        last_name: 'Ochyra',
        email: 'marcin@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'pl'],
        order: {
          [development.term]:7
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/development/marcin.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await marcin.addTaxonomies([development]); // add to member


    const tschanz = await Post.create({
      title: 'Base Coordinator Gstaad',
      post_id: '100034',
      meta: {
        first_name: 'Mickael',
        last_name: 'Tschanz',
        email: 'gstaad@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr', 'de'],
        order: {
          [development.term]:8
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/development/tschanz.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await tschanz.addTaxonomies([development]); // add to member


    const luciano = await Post.create({
      title: 'Business Development Spain - Palma de Mallorca',
      post_id: '100035',
      meta: {
        first_name: 'Luciano',
        last_name: 'Benedetti',
        email: 'luciano@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr', 'es', 'it'],
        order: {
          [development.term]:9
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/development/luciano.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await luciano.addTaxonomies([development]); // add to member


    const eva = await Post.create({
      title: 'Business Development Greece - Mykonos, Santorini, Tessaloniki, Cyprus',
      post_id: '100036',
      meta: {
        first_name: 'Eva',
        last_name: 'Papapetrou',
        email: 'eva@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr', 'br', 'gc'],
        order: {
          [development.term]:10
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/development/eva.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await eva.addTaxonomies([development]); // add to member


    const adil = await Post.create({
      title: 'Business Development Mid East - Pakistan & Bangladesh',
      post_id: '100037',
      meta: {
        first_name: 'Muhammad',
        last_name: 'Adil',
        email: 'adil@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'ar', 'pk', 'in', 'jp'],
        order: {
          [development.term]:11
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/development/adil.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await adil.addTaxonomies([development]); // add to member


    const monica = await Post.create({
      title: 'Business Development Spain - Ibiza',
      post_id: '100038',
      meta: {
        first_name: 'Monica',
        last_name: 'Lacalamita',
        email: 'monica@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'es', 'it'],
        order: {
          [development.term]:12
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/development/monica.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await monica.addTaxonomies([development]); // add to member


    const emma = await Post.create({
      title: 'Base Coordinator Ibiza',
      post_id: '100039',
      meta: {
        first_name: 'Emma',
        last_name: 'Thomson',
        email: 'emma@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'es'],
        order: {
          [development.term]:13
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/development/emma.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await emma.addTaxonomies([development]); // add to member


    const nicholas = await Post.create({
      title: 'Sales Support London',
      post_id: '100040',
      meta: {
        first_name: 'Nicholas',
        last_name: 'Day',
        email: 'nicholas@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr', 'es'],
        order: {
          [development.term]:14
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/development/day.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await nicholas.addTaxonomies([development]); // add to member

//--------------- END DEVELOPMENT TEAM 


//--------------- TECHNOLOGY & MARKETING TEAM 

    const yann = await Post.create({
      title: 'Senior Marketing Manager',
      post_id: '100042',
      meta: {
        first_name: 'yann',
        last_name: 'Saoli',
        email: 'yann@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr'],
        order: {
          [tech_and_marketing.term]:2
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/marketing/yann.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await yann.addTaxonomies([tech_and_marketing]); // add to member

    const nicolas = await Post.create({
      title: 'Marketing Manager',
      post_id: '100043',
      meta: {
        first_name: 'Nicolas',
        last_name: 'Arnaud',
        email: 'nicolas@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr', 'es'],
        order: {
          [tech_and_marketing.term]: 3
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/marketing/nicolas.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await nicolas.addTaxonomies([tech_and_marketing]); // add to member

    const poirson = await Post.create({
      title: 'Digital Marketing Assistant',
      post_id: '100044',
      meta: {
        first_name: 'Guillaume',
        last_name: 'poirson',
        email: 'gpoirson@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr'],
        order: {
          [tech_and_marketing.term]:4
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/marketing/poirson.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await poirson.addTaxonomies([tech_and_marketing]); // add to member

    const stephane = await Post.create({
      title: 'IT Assistant',
      post_id: '100045',
      meta: {
        first_name: 'Stephane',
        last_name: 'Mbida Zié',
        email: 'stephane@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr'],
        order: {
          [tech_and_marketing.term]:5
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/it/stephane.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await stephane.addTaxonomies([tech_and_marketing]); // add to member


    //--------------- END TECHNOLOGY & MARKETING TEAM 


    //--------------- SUPPORT TEAM 


    const melanie = await Post.create({
      title: 'Accountant',
      post_id: '100046',
      meta: {
        first_name: 'Melanie',
        last_name: 'Stauffer',
        email: 'melanie@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr'],
        order: {
          [support.term]:1,
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/support/melanie.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await melanie.addTaxonomies([support]); // add to member


    const isabelle = await Post.create({
      title: 'Executive Assistant',
      post_id: '100047',
      meta: {
        first_name: 'Isabelle',
        last_name: 'David',
        email: 'isabelle@lunajets.com',
        // bio: 'lorem ipsum dolor sit amet ...',
        visible: true,
        flags: ['gb', 'fr', 'es', 'ro'],
        order: {
          [support.term]:2,
        },
        image: 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/public/team/support/isabelle.jpg',
      },
      type: 'team_member',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });
    // Now we need to associate the team member with the respective department
    await isabelle.addTaxonomies([support]); // add to member
    //--------------- END SUPPORT TEAM 

  },
  down: async () => {
    const en = await Language.findOne({ where: { locale: 'en', enabled: true } });

    await Post.destroy({ where: { type: 'team_member' }, force: true, cascade: true });
    await TermTaxonomy.destroy({ where: { taxonomy: 'team_department' }, cascade: true, force: true });
    await Term.destroy({ where: { language_id: en.id, slug: { $in: DEPTS.map(dept => slugify(dept)) } }, cascade: true, force: true });
    
  },
};