import type { ResearchBlog } from '@/types/research-blog'

export const researchBlogs: ResearchBlog[] = [
  {
    topicId: 'rydberg-atomic-receiver',
    slug: 'ise-multi-target-doa-estimation',
    title: 'Multi-Target DoA Estimation with a Single Rydberg Atomic Receiver',
    summary:
      'How fluorescence imaging and spectral estimation turn one Rydberg vapor cell into a broadband, multi-target direction-finding receiver.',
    date: 'July 24, 2026',
    author: 'MCSP Lab',
    readTime: '8 min read',
<<<<<<< HEAD
    heroImage: '/research/blogs/ise-system-diagram.png',
=======
    heroImage: '/research/research-rydberg-atomic-receiver.jpg',
>>>>>>> abb8b463d17aa945b15142ac025a21641d3b6ee6
    tags: ['Rydberg receivers', 'DoA estimation', 'Fluorescence imaging', 'Prony method'],
    sourceUrl: 'https://mp.weixin.qq.com/s/wXF3Dz-EPsZstdyHm5aKug',
    sections: [
      {
        id: 'background',
        number: '01',
        heading: 'Research background',
        paragraphs: [
          'Direction-of-arrival (DoA) estimation is a core capability in radar, navigation, and wireless communication systems. Conventional solutions rely on phased arrays with multiple antennas: the direction of an incoming wave is inferred from phase differences measured across the array. This approach delivers mature performance, but it also brings high system complexity and demanding calibration requirements.',
          'Rydberg atomic receivers exploit the exceptionally strong response of highly excited alkali atoms to radio-frequency fields. Their sensitivity can far exceed that of classical antennas, making them an emerging platform for electromagnetic sensing. Yet DoA estimation with Rydberg receivers has faced a fundamental trade-off.',
        ],
        bullets: [
          {
            label: 'Multi-receiver arrays',
            text: 'Duplicating several atomic receivers increases hardware complexity, calibration effort, and cost.',
          },
          {
            label: 'Single-receiver solutions',
            text: 'Existing approaches are often limited to one target and narrowband operation. Their accuracy can also depend on a wavelength-related vapor-cell length of approximately λ/3, which restricts broadband applications.',
          },
        ],
      },
      {
        id: 'challenges',
        number: '02',
        heading: 'Technical challenges',
        paragraphs: [
          'Fluorescence imaging provides a possible route beyond the single-target and narrowband limits of a single atomic receiver. It also introduces a new set of signal-processing and modeling challenges.',
        ],
        bullets: [
          {
            label: 'Nonlinear response',
            text: 'The interaction between the RF field and the atoms is highly nonlinear. When multiple signals are present, cross terms emerge and become difficult to decouple directly.',
          },
          {
            label: 'Spatial sampling and algorithm design',
            text: 'A continuous fluorescence profile must be converted into discrete spatial-frequency information while keeping the imaging optics, sampling interval, and spectral estimator consistent.',
          },
          {
            label: 'Unknown theoretical performance',
            text: 'Without a multi-target benchmark such as a Cramér–Rao lower bound (CRLB), it is difficult to quantify the method’s absolute estimation potential.',
          },
        ],
      },
      {
        id: 'method',
        number: '03',
        heading: 'The imaging-based spectral estimation method',
        paragraphs: [
          'The proposed imaging-based spectral estimation (ISE) method reads the RF interference pattern inside the vapor cell through side-view fluorescence imaging. It reformulates multi-target DoA estimation as a classical spatial spectral-estimation problem.',
          'The key idea is to operate with a local oscillator (LO) that is much stronger than the incoming signals. Under LO-dominated excitation, the nonlinear atomic absorption response can be linearized into a simple sum of cosine terms. Each target contributes one spatial sinusoid, and its spatial frequency uniquely maps to the target’s direction angle.',
        ],
        bullets: [
          {
            label: 'Multi-signal linearization',
            text: 'A first-order Taylor expansion around the strong LO suppresses signal cross terms and higher-order nonlinear effects to second-order perturbations. The absorption coefficient therefore becomes a linear superposition of spatial sinusoids.',
          },
          {
            label: 'Virtual-array processing',
            text: 'A family of shifted spatial windows applied to the fluorescence profile forms an equivalent virtual sensor array. The resulting sampling rule is explicit: the spatial interval should not exceed λ/4, while the window width should remain below λ/2. No physical replication of antennas is required.',
          },
          {
            label: 'Low-complexity spectral estimation',
            text: 'The Prony method extracts spatial-frequency components with complexity O(p²K). Single-target estimation takes only 0.059 ms in the reported setup, making it faster than ESPRIT and MUSIC.',
          },
          {
            label: 'Theoretical performance benchmark',
            text: 'The multi-target CRLB is derived while explicitly accounting for unknown signal amplitudes and phases, providing a principled reference for system design.',
          },
        ],
        figure: {
<<<<<<< HEAD
          src: '/research/blogs/ise-system-diagram.png',
          alt: 'Schematic illustration of a spatially resolved Rydberg atomic receiver',
          caption: 'Figure 1. Conceptual system diagram of a spatially resolved Rydberg atomic receiver.',
          width: 1080,
          height: 562,
=======
          src: '/research/research-rydberg-atomic-receiver.jpg',
          alt: 'Schematic illustration of a spatially resolved Rydberg atomic receiver',
          caption: 'Figure 1. Conceptual system diagram of a spatially resolved Rydberg atomic receiver.',
>>>>>>> abb8b463d17aa945b15142ac025a21641d3b6ee6
        },
      },
      {
        id: 'advantages',
        number: '04',
        heading: 'Why the approach matters',
        paragraphs: [
          'Compared with earlier single-atom direction-finding schemes and conventional receiver arrays, ISE offers several practical advantages.',
        ],
        bullets: [
          {
            label: 'Native multi-target support',
            text: 'Spatial-frequency components are separated in the spectral domain, so the number of targets is not directly constrained by a nonlinear optimization surface.',
          },
          {
            label: 'No fixed vapor-cell length limit',
            text: 'The earlier optimum cell length near λ/3 is no longer a fundamental requirement. A longer cell creates a larger effective aperture and can improve angular accuracy.',
          },
          {
            label: 'Broadband capability',
            text: 'With the same fixed cell length, higher carrier frequencies produce a larger electrical aperture and therefore higher angular precision.',
          },
          {
            label: 'Simpler RF front end',
            text: 'Spatial sampling is performed optically. System complexity moves from multiple RF front ends to a single optical-imaging chain.',
          },
          {
            label: 'A unifying interpretation',
            text: 'The paper shows that earlier integral-power measurement methods are a special case of ISE under single-channel, single-target conditions. Their optimum λ/3 cell length corresponds mathematically to the boundary imposed by the monotonicity of the sinc-function main lobe.',
          },
        ],
      },
      {
        id: 'results',
        number: '05',
        heading: 'Simulation results',
        paragraphs: [
          'The numerical study uses a 2.03 GHz RF carrier and practical parameters for a four-level rubidium atomic system. The main findings are summarized below.',
        ],
        metrics: [
          { value: '10×', label: 'LO amplitude needed for near-perfect linearization' },
          { value: '−30° / 45°', label: 'Two target directions resolved at 30 dB SNR' },
          { value: '0.059 ms', label: 'Reported single-target Prony runtime' },
          { value: '1° RMSE', label: 'Resolution benchmark used for scalability tests' },
        ],
<<<<<<< HEAD
        figures: [
          {
            src: '/research/blogs/ise-lo-strength.png',
            alt: 'Simulation results comparing strong and weak local oscillator conditions',
            caption: 'Figure 2. Multi-target DoA estimation and the effect of LO strength. (a) Accurate estimation with a strong LO; (b) degradation with a weak LO; (c) RMSE versus the LO-to-signal ratio.',
            width: 1080,
            height: 916,
          },
          {
            src: '/research/blogs/ise-crlb-snr.png',
            alt: 'DoA estimation RMSE versus signal-to-noise ratio',
            caption: 'Figure 3. DoA estimation RMSE versus SNR. Prony closely follows the CRLB in the single-target high-SNR regime, while two-target cases depend on angular separation.',
            width: 1080,
            height: 729,
          },
        ],
=======
>>>>>>> abb8b463d17aa945b15142ac025a21641d3b6ee6
        bullets: [
          {
            label: 'Linearization verified',
            text: 'When the LO amplitude is about ten times the total signal amplitude, the true absorption curve and its linear model almost perfectly overlap. The mismatch becomes noticeable with a weak LO.',
          },
          {
            label: 'Multi-target resolution',
            text: 'At SNR = 30 dB and a cell length of L = 4λ, Prony accurately estimates two targets at −30° and 45°. The RMSE falls rapidly as the LO-to-signal ratio increases and reaches the noise floor once the ratio exceeds ten.',
          },
          {
            label: 'CRLB approach',
            text: 'For a single target, the Prony estimator follows the CRLB closely in the high-SNR region, indicating near-optimal estimation performance.',
          },
          {
            label: 'Scalability',
            text: 'With L = 4λ, K = 16, and SNR = 30 dB, the minimum angular separations required to reach 1° RMSE are approximately 3.25° for two targets, 11.0° for three targets, and 15.25° for four targets. The maximum resolvable target count depends jointly on aperture, sample count, SNR, and angular separation.',
          },
        ],
      },
      {
        id: 'conclusion',
        number: '06',
        heading: 'Takeaway',
        paragraphs: [
          'ISE converts multi-target DoA estimation from a nonlinear single-receiver problem into a classical spatial spectral-estimation problem. With one vapor cell and one camera, it avoids multiple atomic receivers and phase-shifter amplitude controllers while enabling high-accuracy, broadband direction finding.',
          'The simulations show that Prony can approach the CRLB in the appropriate operating regime. More broadly, ISE turns a single vapor cell into an observable continuous receive aperture, providing a practical receiver-side path toward multi-channel Rydberg sensing and holographic MIMO.',
        ],
      },
    ],
    paperInfo: [
      {
        label: 'Title',
        value: 'Multi-Target DoA Estimation with a Single Rydberg Atomic Receiver by Spectral Analysis of Spatially-Resolved Fluorescence',
      },
      { label: 'Authors', value: 'Liangcheng Han, Haifan Yin, and Mérouane Debbah' },
      {
        label: 'Affiliations',
        value: 'School of Electronic Information and Communications, Huazhong University of Science and Technology; KU 6G Research Center, Khalifa University',
      },
      { label: 'Journal', value: 'IEEE Transactions on Communications' },
    ],
  },
]
