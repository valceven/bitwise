import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { X, Edit3, Trash2, AlertTriangle, Save } from "lucide-react";
import { teacherApi } from "../../api/teacher/teacherApi";
import { toast } from 'react-toastify';

const EditClassroomModal = ({ isOpen, onClose, classroom, onClassroomUpdated, onClassroomDeleted }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmCode, setDeleteConfirmCode] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !classroom) return null;

  // Validation schema for editing classroom
  const validationSchema = Yup.object({
    className: Yup.string()
      .required("Class name is required")
      .min(2, "Class name must be at least 2 characters")
      .max(100, "Class name must be less than 100 characters"),
    description: Yup.string()
      .max(500, "Description must be less than 500 characters"),
    section: Yup.string()
      .required("Section is required")
      .min(1, "Section is required")
      .max(50, "Section must be less than 50 characters"),
  });

  // Handle form submission for updating classroom
  const handleUpdateClassroom = async (values, { setSubmitting }) => {
    try {
      await teacherApi.updateClassroom(values);
      toast.success("Classroom updated successfully!");
      onClassroomUpdated({ ...classroom, ...values });
      onClose();
    } catch (error) {
      console.error("Error updating classroom:", error);
      toast.error("Failed to update classroom");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle classroom deletion
  const handleDeleteClassroom = async () => {
    if (deleteConfirmCode !== classroom.classCode) {
      toast.error("Class code doesn't match. Please enter the correct class code.");
      return;
    }

    setIsDeleting(true);
    try {
      await teacherApi.deleteClassroom(classroom.classroomId);
      toast.success("Classroom deleted successfully!");
      onClassroomDeleted(classroom.classroomId);
      onClose();
      setShowDeleteConfirm(false);
      setDeleteConfirmCode("");
    } catch (error) {
      console.error("Error deleting classroom:", error);
      toast.error("Failed to delete classroom");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    setShowDeleteConfirm(false);
    setDeleteConfirmCode("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Edit3 size={20} className="text-bluez mr-2" />
            <h2 className="text-xl font-bold text-grayz">Edit Classroom</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Classroom Info */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Class Code</div>
            <div className="text-lg font-mono font-bold text-bluez">{classroom.classCode}</div>
          </div>

          <Formik
            initialValues={{
              classroomId: classroom.classroomId || "",
              className: classroom.className || "",
              description: classroom.description || "",
              section: classroom.section || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleUpdateClassroom}
          >
            {({ isSubmitting, values, handleChange, handleBlur }) => (
              <Form className="space-y-4">
                {/* Class Name */}
                <div>
                  <label htmlFor="className" className="block text-sm font-medium text-grayz mb-2">
                    Class Name
                  </label>
                  <Field
                    type="text"
                    id="className"
                    name="className"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bluez focus:border-transparent"
                    placeholder="Enter class name"
                  />
                  <ErrorMessage name="className" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Section */}
                <div>
                  <label htmlFor="section" className="block text-sm font-medium text-grayz mb-2">
                    Section
                  </label>
                  <Field
                    type="text"
                    id="section"
                    name="section"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bluez focus:border-transparent"
                    placeholder="Enter section"
                  />
                  <ErrorMessage name="section" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-grayz mb-2">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bluez focus:border-transparent resize-none"
                    placeholder="Enter class description (optional)"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Update Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-bluez text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Update Classroom
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>

          {/* Delete Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center mb-4">
              <AlertTriangle size={20} className="text-red-500 mr-2" />
              <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
            </div>
            
            {!showDeleteConfirm ? (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Deleting this classroom will permanently remove all associated data including students and their progress. This action cannot be undone.
                </p>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full bg-red-50 text-red-600 border border-red-200 py-3 px-4 rounded-lg hover:bg-red-100 transition flex items-center justify-center"
                >
                  <Trash2 size={18} className="mr-2" />
                  Delete Classroom
                </button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-red-600 mb-4 font-medium">
                  To confirm deletion, please type the class code "{classroom.classCode}" below:
                </p>
                <input
                  type="text"
                  value={deleteConfirmCode}
                  onChange={(e) => setDeleteConfirmCode(e.target.value)}
                  className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4"
                  placeholder="Enter class code to confirm"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmCode("");
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteClassroom}
                    disabled={isDeleting || deleteConfirmCode !== classroom.classCode}
                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"
                  >
                    {isDeleting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Trash2 size={18} className="mr-2" />
                        Delete Forever
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClassroomModal;