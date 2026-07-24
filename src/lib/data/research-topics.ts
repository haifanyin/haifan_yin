import type { ResearchTopic } from "@/types";

// ==================== RESEARCH ====================
export const researchTopics: ResearchTopic[] = [
  {
    id: "massive-mimo",
    title: "Massive MIMO",
    image: "/research/research-massive-mimo.jpg",
    description:
      "Massive MIMO is one of the key enablers of the 5G cellular systems. Compared to traditional MIMO with fewer base station antennas, massive MIMO can offer unprecedented spectral efficiency gains. Despite the technology hype and great expectations, some of the latest field trials have unfortunately been disappointing when it comes to actual system performance in mobility scenarios. It was observed that moderate-mobility at 30 km/h leads to as much as 50% performance reduction versus low-mobility at 3 km/h.",
    topCollaborator: { name: 'D. Gesbert', initials: 'DG', paperCount: 3 },
    relatedTopics: ['fdd-mimo', 'channel-prediction'],
    papers: [
      {
        citation:
          'H. Yin, H. Wang, Y. Liu, and D. Gesbert, "Addressing the curse of mobility in massive MIMO with Prony-based angular-delay domain channel predictions," IEEE Journal on Selected Areas in Communications, Vol. 38, No. 12, pp. 2903-2917, Dec. 2020.',
      },
      {
        citation:
          'H. Yin, D. Gesbert, M. Filippou, and Y. Liu, "A coordinated approach to channel estimation in large-scale multiple-antenna systems," IEEE Journal on Selected Areas in Communications, Vol. 31, No. 2, pp. 264-273, Feb. 2013.',
      },
      {
        citation:
          'H. Yin, L. Cottatellucci, D. Gesbert, R. R. Muller, and G. He, "Robust pilot decontamination based on joint angle and power domain discrimination," IEEE Transactions on Signal Processing, Vol. 64, No. 11, pp. 2990-3003, Jun. 2016.',
      },
      {
        citation:
          'W. Li, H. Yin, Z. Qin, and M. Debbah, "Wavefront transformation-based near-field channel prediction for extremely large antenna array with mobility," IEEE Transactions on Wireless Communications, Vol. 23, No. 10, pp. 15613-15626, Oct. 2024.',
      },
    ],
  },
  {
    id: "ris",
    title: "Reconfigurable Intelligent Surface (RIS)",
    image: "/research/research-ris.jpg",
    description:
      "RIS is an emerging technology for 6G wireless networks that can smartly reconfigure the wireless propagation environment. Our lab has been at the forefront of RIS research, conducting real-world prototyping and field trials. We have built one of the world's first RIS prototypes and demonstrated its performance in both indoor and outdoor environments. Our work on RIS-aided communications received the 2024 Stephen O. Rice Prize and the IEEE ComSoc Best Readings on RIS.",
    topCollaborator: { name: 'L. Tan', initials: 'LT', paperCount: 4 },
    relatedTopics: ['holographic'],
    papers: [
      {
        citation:
          'X. Pei, H. Yin, L. Tan, L. Cao, Z. Li, K. Wang, K. Zhang, and E. Björnson, "RIS-aided wireless communications: Prototyping, adaptive beamforming, and indoor/outdoor field trials," IEEE Transactions on Communications, Vol. 69, No. 12, pp. 8627-8640, Dec. 2021.',
      },
      {
        citation:
          'L. Cao, H. Yin, L. Tan, and X. Pei, "RIS with insufficient phase shifting capability: Modeling, beamforming, and experimental validations," IEEE Transactions on Communications, Vol. 72, No. 9, pp. 5911-5923, Sept. 2024.',
      },
      {
        citation:
          'J. Hu, H. Yin, L. Tan, L. Cao, and X. Pei, "RIS-aided wireless communications: Can RIS beat flat metal plate?" IEEE Transactions on Vehicular Technology, May 2024.',
      },
      {
        citation:
          'Z. Zhou, H. Yin, L. Tan, R. Zhang, K. Wang, and Y. Liu, "Multi-user passive beamforming in RIS-aided communications and experimental validations," IEEE Transactions on Communications, May 2024.',
      },
    ],
  },
  {
    id: "fdd-mimo",
    title: "FDD Massive MIMO",
    image: "/research/research-fdd-mimo.jpg",
    description:
      "In frequency division duplex (FDD) massive MIMO systems, acquiring accurate downlink channel state information (CSI) at the base station is fundamentally challenging due to the lack of channel reciprocity. Our research explores partial reciprocity-based channel prediction, manifold learning-based CSI feedback, and codebook design to bridge the FDD CSI gap, achieving near-optimal performance with minimal overhead.",
    topCollaborator: { name: 'D. Gesbert', initials: 'DG', paperCount: 2 },
    relatedTopics: ['massive-mimo', 'channel-prediction'],
    papers: [
      {
        citation:
          'H. Yin, and D. Gesbert, "A partial channel reciprocity-based codebook for wideband FDD massive MIMO," IEEE Transactions on Wireless Communications, Vol. 21, No. 9, pp. 7696-7710, Sept. 2022.',
      },
      {
        citation:
          'Z. Qin, H. Yin, Y. Cao, W. Li, and D. Gesbert, "A partial reciprocity-based channel prediction framework for FDD massive MIMO with high mobility," IEEE Transactions on Wireless Communications, Vol. 21, No. 11, pp. 9638-9652, Nov. 2022.',
      },
      {
        citation:
          'Y. Cao, H. Yin, Z. Qin, W. Li, W. Wu, and M. Debbah, "A manifold learning-based CSI feedback framework for FDD massive MIMO," IEEE Transactions on Communications, Aug. 2024.',
      },
    ],
  },
  {
    id: "superdirective",
    title: "Superdirective Antenna Arrays",
    image: "/research/research-superdirective.jpg",
    description:
      "Superdirective antenna arrays can achieve directivity far beyond the conventional limit through careful control of element coupling and excitation. Our research pioneers coupling matrix-based beamforming methods for superdirective arrays, addressing practical challenges such as excitation power constraints and sensitivity. We have achieved M² directivity in compact arrays and demonstrated multi-user communication gains through superdirectivity-enhanced beamforming.",
    topCollaborator: { name: 'L. Han', initials: 'LH', paperCount: 4 },
    relatedTopics: [],
    papers: [
      {
        citation:
          'L. Han, H. Yin, and T. L. Marzetta, "Coupling matrix-based beamforming for superdirective antenna arrays," IEEE ICC 2022, Seoul, South Korea, May 2022.',
      },
      {
        citation:
          'L. Han, and H. Yin, "Superdirectivity-enhanced wireless communications: A multi-user perspective," IEEE PIMRC 2024, Valencia, Spain, Sept. 2024.',
      },
      {
        citation:
          'M. Gao, H. Yin, and L. Han, "An EEP-based robust beamforming approach for superdirective antenna arrays and experimental validations," Aug. 2023.',
      },
      {
        citation:
          'Y. Zhang, H. Yin and L. Han, "A superdirective beamforming approach based on MultiTransUNet-GAN," IEEE Transactions on Communications, Sept. 2024.',
      },
    ],
  },
  {
    id: "channel-prediction",
    title: "Channel Prediction",
    image: "/research/research-channel-prediction.jpg",
    description:
      "Accurate channel prediction is essential for realizing the full potential of massive MIMO in mobile environments. Our work spans from angular-delay domain channel prediction using Prony-based methods, to spatio-temporal neural network approaches, to near-field channel prediction based on wavefront transformation for extremely large antenna arrays. We address both far-field and near-field scenarios with mobility.",
    topCollaborator: { name: 'W. Li', initials: 'WL', paperCount: 3 },
    relatedTopics: ['massive-mimo', 'fdd-mimo'],
    papers: [
      {
        citation:
          'W. Li, H. Yin, Z. Qin, Y. Cao, and M. Debbah, "A multi-dimensional matrix pencil-based channel prediction method for massive MIMO with mobility," IEEE Transactions on Wireless Communications, Vol. 22, No. 4, pp. 2215-2230, Apr. 2023.',
      },
      {
        citation:
          'G. Liu, Z. Hu, L. Wang, J. Xue, H. Yin and D. Gesbert, "Spatio-temporal neural network for channel prediction in massive MIMO-OFDM systems," IEEE Transactions on Communications, Vol. 70, No. 12, pp. 8003-8016, Dec. 2022.',
      },
      {
        citation:
          'Z. Qin, H. Yin, and W. Li, "Eigenvector prediction-based precoding for massive MIMO with mobility," Aug. 2023.',
      },
      {
        citation:
          'Y. Huang, H. Wang, H. Yin and Z. Zhao, "Iterative time-varying channel prediction based on the vector Prony method," Wireless Personal Communications, Vol. 136, pp. 103-122, June 2024.',
      },
    ],
  },
  {
    id: "holographic",
    title: "Holographic & Metasurface Antennas",
    image: "/research/research-holographic.jpg",
    description:
      "Holographic interference surfaces (HIS) and dynamic metasurface antennas (DMA) represent a new paradigm in antenna design, enabling continuous aperture reconfiguration for beamforming and channel sensing. Our research covers channel sensing methods based on the principle of interferometry, quantum genetic interference mitigation algorithms for DMA, and active transmissive RIS prototyping with field trials.",
    topCollaborator: { name: 'R. Song', initials: 'RS', paperCount: 2 },
    relatedTopics: ['ris'],
    papers: [
      {
        citation:
          'R. Song, H. Yin, Z. Wang, T. Yang and X. Ren, "Modeling, design, and verification of an active transmissive RIS," IEEE Transactions on Antennas and Propagation, Oct. 2024.',
      },
      {
        citation:
          'T. Yang, H. Yin, R. Song and L. Zhang, "A block quantum genetic interference mitigation algorithm for Dynamic Metasurface Antennas and field trials," IEEE Wireless Communications Letters, Oct. 2024.',
      },
      {
        citation:
          'J. Huang, Y. Wu, H. Yin, Y. Zhang, and R. Zhang, "Channel sensing for holographic interference surfaces based on the principle of interferometry," IEEE Transactions on Wireless Communications, Vol. 23, No. 7, pp. 7953-7966, July 2024.',
      },
    ],
  },
];
