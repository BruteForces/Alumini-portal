import Alumni from "../models/Alumni.js";
import asyncHandler from "express-async-handler";

export const registerAlumni = asyncHandler(async (req, res) => {
  const {
    user,
    isEntrepreneur,
    isInHigherStudies,
    designation,
    companyName,
    companyEmail,
    organization,
    secondaryCollegeName,
    domain,
    courseName,
    social: { facebook, twitter, linkedin, github },
    isOfficeBearer,
    profileDescription,
  } = req.body;

  const existingAlumni = await Alumni.findOne({ user });

  if (existingAlumni) {
    return res.status(400).json({
      error: "You're already registered as an Alumni",
    });
  }

  const alumni = await Alumni.create({
    user,
    isEntrepreneur,
    isInHigherStudies,
    designation,
    companyName,
    companyEmail,
    organization,
    secondaryCollegeName,
    domain,
    courseName,
    social: {
      facebook,
      twitter,
      linkedin,
      github,
    },
    isOfficeBearer,
    profileDescription,
  });

  if (alumni) {
    res.status(200).json({
      _id: alumni._id,
      user: alumni.user,
      isEntrepreneur: alumni.isEntrepreneur,
      isInHigherStudies: alumni.isInHigherStudies,
      designation: alumni.designation,
      companyName: alumni.companyName,
      companyEmail: alumni.companyEmail,
      organization: alumni.organization,
      secondaryCollegeName: alumni.secondaryCollegeName,
      domain: alumni.domain,
      courseName: alumni.courseName,
      social: alumni.social,
      isOfficeBearer: alumni.isOfficeBearer,
      profileDescription: alumni.profileDescription,
      isApproved: alumni.isApproved,
    });
  } else {
    res.status(400).json({
      error:
        "Cannot register as an Alumni at this time, please try again later",
    });
  }
});

export const deleteAlumni = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const alumni = await Alumni.findOneAndDelete({ user: id });

  if (alumni) {
    res.status(200).json({
      message: "Alumni deleted successfully",
    });
  } else {
    res.status(400).json({
      error: "Cannot delete Alumni at this time, please try again later",
    });
  }
});

export const approveAlumni = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const alumni = await Alumni.findOneAndUpdate(
    { user: id },
    {
      $set: {
        isApproved: true,
      },
    }
  );

  if (alumni) {
    res.status(200).json({
      message: "Alumni approved successfully",
    });
  } else {
    res.status(400).json({
      error: "Cannot approve Alumni at this time, please try again later",
    });
  }
});

export const updateAlumni = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const alumni = Alumni.findOneAndUpdate(
    { user: id },
    req.body,
    {
      new: true,
    },
    (err) => {
      console.log(err);
    }
  );

  if (alumni) {
    res.status(200).json({
      message: "Alumni updated successfully",
    });
  } else {
    res.status(400).json({
      error: "Cannot update Alumni at this time, please try again later",
    });
  }
});

export const getAlumniById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const alumni = await Alumni.findOne({ user: id }).populate("user");

  if (alumni) {
    res.status(200).json({
      _id: alumni._id,
      user: alumni.user,
      isEntrepreneur: alumni.isEntrepreneur,
      isInHigherStudies: alumni.isInHigherStudies,
      designation: alumni.designation,
      companyName: alumni.companyName,
      companyEmail: alumni.companyEmail,
      organization: alumni.organization,
      secondaryCollegeName: alumni.secondaryCollegeName,
      domain: alumni.domain,
      courseName: alumni.courseName,
      social: alumni.social,
      isOfficeBearer: alumni.isOfficeBearer,
      profileDescription: alumni.profileDescription,
    });
  } else {
    res.status(400).json({
      error: "Cannot find Alumni at this time, please try again later",
    });
  }
});

export const setOfficeBearer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const alumni = await Alumni.findOneAndUpdate(
      { user: id },
      {
        $set: {
          isOfficeBearer: true,
        },
      }
    );

    if (alumni) {
      return res.status(200).json({
        message: "Alumni set as Office Bearer successfully",
      });
    }

    return res.status(400).json({
      error:
        "Cannot set Alumni as Office Bearer at this time, please try again later",
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        error: "Wrong User Id",
      });
    }
    res.status(400).json({
      error,
    });
  }
});

export const removeOfficeBearer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const alumni = await Alumni.findOneAndUpdate(
      { user: id },
      {
        $set: {
          isOfficeBearer: false,
        },
      }
    );

    if (alumni) {
      return res.status(200).json({
        message: "Alumni removed as Office Bearer successfully",
      });
    }

    return res.status(400).json({
      error:
        "Cannot remove Alumni as Office Bearer at this time, please try again later",
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        error: "Wrong User Id",
      });
    }
    res.status(400).json({
      error,
    });
  }
});
